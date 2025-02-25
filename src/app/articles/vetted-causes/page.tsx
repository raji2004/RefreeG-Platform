import Image from "next/image";
import Link from "next/link";
export default function TransparencyPage() {
  return (
    <div className="w-full px-4 md:px-16 lg:px-32 py-12 bg-white">
      {/* Vetted Causes */}
      <section className="text-center">
        <h2 className="text-gray-700 text-sm uppercase tracking-widest mb-2">
          Why You Should Use Us
        </h2>
        <h1 className="text-3xl font-bold mb-6">Vetted Causes</h1>
        <div className="w-full flex justify-center mb-6">
          <Image
            src="/vetted.svg"
            alt="Blockchain Transparency"
            width={700}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-justify">
          At RefreeG, we prioritize trust and accountability. Every cause
          featured on our platform undergoes a rigorous vetting process to
          ensure transparency and legitimacy. Our approach begins with a
          detailed application, where cause creators submit comprehensive
          information about their initiative, goals, and impact projections.
          <br />
          <br />
          Each application is reviewed by our verification team, who cross-check
          details, validate the mission, and confirm the legitimacy of the
          individuals or organizations involved.
          <br />
          <br />
          To further secure credibility, we utilize blockchain’s immutable
          ledger to transparently log each cause’s progress and updates, making
          each step visible to donors and our community. This process includes
          financial audits and milestones that every cause must meet to stay
          active on the platform.
          <br />
          <br />
          With RefreeG’s commitment to due diligence, donors can trust that
          their contributions are making a genuine difference toward causes that
          align with RefreeG’s mission for socioeconomic growth.
        </p>
        <Link
          href="https://t.me/+d67UCIer8c01ODhk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Join our community to track donations
          </button>
        </Link>
      </section>
    </div>
  );
}
