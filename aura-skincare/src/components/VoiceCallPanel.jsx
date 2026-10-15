
import { useRef, useState } from "react";

const API_URL = "http://localhost:5000/api/conversation";

function VoiceCallPanel() {
  const [callActive, setCallActive] = useState(false);
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);
  const activeRef = useRef(false);
  const processingRef = useRef(false);
  const restartTimerRef = useRef(null);

  function addMessage(role, text) {
    setMessages((previous) => [...previous, { role, text }]);
  }

  function stopCall() {
    activeRef.current = false;
    processingRef.current = false;

    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }

    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.onresult = null;
      recognitionRef.current.onerror = null;

      try {
        recognitionRef.current.stop();
      } catch {
        // Recognition may already be stopped.
      }

      recognitionRef.current = null;
    }

    window.speechSynthesis?.cancel();

    setCallActive(false);
    setListening(false);
    setProcessing(false);
  }

  function startListening() {
    const recognition = recognitionRef.current;

    if (
      !recognition ||
      !activeRef.current ||
      processingRef.current
    ) {
      return;
    }

    try {
      recognition.start();
    } catch (err) {
      if (err.name !== "InvalidStateError") {
        setError("Could not start the microphone. Please try again.");
      }
    }
  }

  async function handleCustomerSpeech(customerMessage) {
    if (!customerMessage.trim() || processingRef.current) return;

    processingRef.current = true;
    setProcessing(true);
    setListening(false);
    setError("");

    addMessage("customer", customerMessage);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: customerMessage }),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.reply) {
        throw new Error(data.message || "Aria could not respond.");
      }

      const reply = data.reply;
      addMessage("aria", reply);

      if (!("speechSynthesis" in window)) {
        setError("Spoken responses are not supported in this browser.");
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        reply.replace(/[*`#_]/g, "")
      );

      utterance.lang = "en-IN";
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onend = () => {
        processingRef.current = false;
        setProcessing(false);

        if (activeRef.current) {
          restartTimerRef.current = setTimeout(() => {
            startListening();
          }, 300);
        }
      };

      utterance.onerror = () => {
        processingRef.current = false;
        setProcessing(false);

        if (activeRef.current) {
          restartTimerRef.current = setTimeout(() => {
            startListening();
          }, 500);
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot reach Aria. Check that your backend is running."
          : err.message || "Something went wrong."
      );

      processingRef.current = false;
      setProcessing(false);

      if (activeRef.current) {
        restartTimerRef.current = setTimeout(() => {
          startListening();
        }, 800);
      }
    }
  }

  function startCall() {
    setError("");

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "Speech recognition is not supported in this browser. Try a supported version of Chrome or Edge."
      );
      return;
    }

    if (!("speechSynthesis" in window)) {
      setError("This browser does not support spoken responses.");
      return;
    }

    if (activeRef.current) return;

    window.speechSynthesis.cancel();

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];

      if (!result.isFinal) return;

      const spokenText = result[0].transcript.trim();

      if (spokenText) {
        handleCustomerSpeech(spokenText);
      }
    };

    recognition.onerror = (event) => {
      setListening(false);

      if (event.error === "not-allowed") {
        setError(
          "Microphone access was denied. Allow microphone access in your browser settings."
        );
        stopCall();
        return;
      }

      if (event.error === "audio-capture") {
        setError("No working microphone was found.");
        stopCall();
        return;
      }

      if (
        event.error !== "no-speech" &&
        event.error !== "aborted"
      ) {
        setError(`Microphone error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setListening(false);

      if (activeRef.current && !processingRef.current) {
        restartTimerRef.current = setTimeout(() => {
          startListening();
        }, 300);
      }
    };

    recognitionRef.current = recognition;
    activeRef.current = true;
    setCallActive(true);

    startListening();
  }

  const orderId =
    messages
      .map((item) => item.text.match(/\bORD-\d+\b/i)?.[0])
      .find(Boolean) || "Not identified";

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#294735] p-6 text-white sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide">
            AURA VOICE ASSISTANT
          </span>

          <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/80">
            <span
              className={`h-2 w-2 rounded-full ${
                listening
                  ? "animate-pulse bg-green-300"
                  : processing
                    ? "bg-amber-300"
                    : callActive
                      ? "bg-green-300"
                      : "bg-gray-400"
              }`}
            />
            {listening
              ? "Listening..."
              : processing
                ? "Aria is responding..."
                : callActive
                  ? "Voice call active"
                  : "Voice assistant ready"}
          </span>
        </div>

        <div className="mx-auto mt-8 flex max-w-md flex-col items-center text-center">
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-[#3d5b47] shadow-lg ${
              listening ? "ring-4 ring-green-300/30" : ""
            }`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dce8d8] text-3xl font-semibold text-[#294735]">
              A
            </div>
          </div>

          <h2 className="mt-5 text-3xl font-semibold">Meet Aria</h2>

          <p className="mt-2 text-sm leading-6 text-white/70">
            Your personal Aura Skincare support assistant.
            Speak naturally about orders, delivery, returns, and more.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {!callActive ? (
              <button
                type="button"
                onClick={startCall}
                className="flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-medium text-[#294735] transition hover:bg-[#dce8d8]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                  <line x1="8" x2="16" y1="22" y2="22" />
                </svg>
                Start Voice Call
              </button>
            ) : (
              <button
                type="button"
                onClick={stopCall}
                className="flex items-center gap-3 rounded-full bg-red-500 px-7 py-3.5 font-medium text-white transition hover:bg-red-600"
              >
                End Voice Call
              </button>
            )}
          </div>

          <p className="mt-3 text-xs text-white/60">
            {listening
              ? "Speak now. Aria will respond when you finish."
              : processing
                ? "Please wait for Aria to finish speaking."
                : callActive
                  ? "Listening will resume automatically."
                  : "Allow microphone access when prompted."}
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mx-auto mt-6 max-w-lg rounded-xl border border-red-200/20 bg-red-950/30 p-3 text-sm text-red-100"
          >
            {error}
          </div>
        )}

        <div className="mt-8 border-t border-white/15 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-medium">Live Transcript</h3>
            <span className="text-xs text-white/60">
              {messages.length} messages
            </span>
          </div>

          <div
            className="mt-3 max-h-72 space-y-3 overflow-y-auto rounded-xl bg-black/10 p-4"
            aria-live="polite"
          >
            {messages.length === 0 && (
              <p className="py-5 text-center text-sm text-white/60">
                Your conversation will appear here when you start speaking.
              </p>
            )}

            {messages.map((item, index) => (
              <div
                key={`${index}-${item.role}`}
                className={`rounded-xl p-3 ${
                  item.role === "aria"
                    ? "bg-white/10"
                    : "bg-white/5"
                }`}
              >
                <p className="text-xs font-semibold text-[#dce8d8]">
                  {item.role === "aria" ? "Aria" : "Customer"}
                </p>
                <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-white/90">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-sm font-medium">Order Support</p>
              <p className="mt-1 text-xs leading-5 text-white/60">
                Delivery and tracking details
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-sm font-medium">Store Policies</p>
              <p className="mt-1 text-xs leading-5 text-white/60">
                Returns and cancellation eligibility
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-sm font-medium">Call Summary</p>
              <p className="mt-1 text-xs leading-5 text-white/60">
                Order ID: {orderId}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VoiceCallPanel;
