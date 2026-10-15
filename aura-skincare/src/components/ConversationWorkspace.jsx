import { useState } from "react";

function ConversationWorkspace() {
  const [activeTab, setActiveTab] = useState("transcript");

  return (
    <section className="rounded-2xl border border-[#e5e7df] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#233b2d]">
            Conversation Workspace
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review the conversation and customer support outcome.
          </p>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
          No active call
        </span>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 border-b border-[#e8ebe4]">
        <button
          type="button"
          onClick={() => setActiveTab("transcript")}
          className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
            activeTab === "transcript"
              ? "border-[#426348] text-[#294735]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Live Transcript
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("summary")}
          className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
            activeTab === "summary"
              ? "border-[#426348] text-[#294735]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Call Summary
        </button>
      </div>

      {/* Transcript tab */}
      {activeTab === "transcript" && (
        <div className="mt-5 rounded-xl bg-[#f8f9f5] p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#dce8d8] text-sm font-semibold text-[#294735]">
              A
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800">
                Aria
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Your conversation transcript will appear here
                when a voice call is connected.
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
              C
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800">
                Customer
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Customer messages will appear here during the call.
              </p>
            </div>
          </div>

          <p className="mt-5 border-t border-gray-200 pt-4 text-xs text-gray-400">
            Waiting for a voice session to begin.
          </p>
        </div>
      )}

      {/* Summary tab */}
      {activeTab === "summary" && (
        <div className="mt-5 space-y-4">
          <div className="rounded-xl bg-[#f8f9f5] p-5">
            <h3 className="font-medium text-[#294735]">
              Customer Intent
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Not available until a conversation is completed.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#e8ebe4] p-4">
              <h3 className="text-sm font-medium text-gray-700">
                Order ID
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Not identified
              </p>
            </div>

            <div className="rounded-xl border border-[#e8ebe4] p-4">
              <h3 className="text-sm font-medium text-gray-700">
                Resolution Status
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Pending
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#e8ebe4] p-4">
            <h3 className="text-sm font-medium text-gray-700">
              Next Action
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              No follow-up action recorded.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ConversationWorkspace;
