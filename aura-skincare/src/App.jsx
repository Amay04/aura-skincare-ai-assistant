import Header from "./components/Header";
import VoiceCallPanel from "./components/VoiceCallPanel";
import SampleOrdersPanel from "./components/SampleOrdersPanel";
import BrandPoliciesPanel from "./components/BrandPoliciesPanel";

function App() {
  return (
    <div className="min-h-screen bg-[#f7f8f3] text-gray-800">
      <Header />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <section className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#718b70]">
            Customer Experience Platform
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-[#233b2d] sm:text-4xl">
            Meet Aria, your AI voice assistant.
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
            A personal customer support experience for Aura Skincare.
            Get order updates, understand store policies, and receive
            assistance through a natural voice conversation.
          </p>
        </section>

        {/* Voice assistant and capabilities */}
        <section className="mb-8 grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <VoiceCallPanel />

          <div className="rounded-3xl border border-[#e5e7df] bg-white p-6 sm:p-8">
            <p className="text-sm font-medium text-gray-500">
              ASSISTANT CAPABILITIES
            </p>

            <h3 className="mt-3 text-2xl font-semibold text-[#233b2d]">
              Support that feels personal.
            </h3>

            <div className="mt-6 space-y-4">
              {[
                {
                  number: "01",
                  title: "Order tracking",
                  description: "Check delivery status and tracking details.",
                },
                {
                  number: "02",
                  title: "Policy assistance",
                  description: "Understand shipping, returns, and cancellations.",
                },
                {
                  number: "03",
                  title: "Conversation transcript",
                  description: "Review what the customer and Aria discussed.",
                },
              ].map((item) => (
                <div key={item.number} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#edf3eb] text-sm font-semibold text-[#426348]">
                    {item.number}
                  </span>

                  <div>
                    <h4 className="font-medium text-gray-800">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample data and policies */}
        <section className="grid items-start gap-6 lg:grid-cols-2">
          <SampleOrdersPanel />
          <BrandPoliciesPanel />
        </section>

        <footer className="py-8 text-center text-sm text-gray-500">
          Aura Skincare · AI-Powered Customer Experience
        </footer>
      </main>
    </div>
  );
}

export default App;
