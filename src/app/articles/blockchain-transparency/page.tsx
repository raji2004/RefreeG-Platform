import Image from "next/image";
import Link from "next/link";
export default function TransparencyPage() {
  return (
    <div className="w-full px-4 md:px-16 lg:px-32 py-12 bg-white">
      {/* Blockchain Transparency Section */}
      <section className="text-center">
        <h2 className="text-gray-700 text-sm uppercase tracking-widest mb-2">
          Why You Should Use Us
        </h2>
        <h1 className="text-3xl font-bold mb-6">Blockchain Transparency</h1>
        <div className="w-full flex justify-center mb-6">
          <Image
            src="/polygon.jpg"
            alt="Blockchain Transparency"
            width={700}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-justify">
          At RefreeG, transparency is our top priority, and we achieve this
          using blockchain technology. With blockchain, every donation is
          permanently recorded on a secure, public ledger, so donors can track
          their contributions in real time.
          <br />
          <br />
          This ensures complete visibility—donors always know where their money
          is going and how it’s being used. There’s no risk of funds being
          mismanaged or hidden fees sneaking in. Smart contracts—automated
          agreements on the blockchain—make sure that money is only released
          when certain conditions are met, adding an extra layer of security.
          <br />
          <br />
          This prevents fraud and ensures donations truly reach the right
          people. We use Polygon, a fast and cost-effective blockchain, to make
          transactions smooth and affordable. This way, everyone
          involved—donors, beneficiaries, and organizations—can trust the
          system, knowing that every step is open and verifiable.
          <br />
          <br />
          RefreeG is built to be a trustworthy platform that makes a real
          difference in education funding.
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

      {/* Real-Time Tracking Section */}
      <section className="mt-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Real-Time Tracking</h1>
        <div className="w-full flex justify-center mb-6">
          <Image
            src="/tracking.svg"
            alt="Real-Time Tracking"
            width={700}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-justify">
          At RefreeG, transparency is the core of our mission. We’ve integrated
          blockchain technology to bring you a secure, real-time tracking
          experience that ensures every donation’s journey is visible and
          verifiable.
          <br />
          <br />
          From the moment a donation is made, RefreeG’s system records each
          transaction onto the blockchain, creating a transparent trail that’s
          accessible through our user-friendly dashboard. Here, donors can see
          exactly where and how their contributions are being applied to each
          cause, updated in real-time.
          <br />
          <br />
          Our platform breaks down the progress of individual initiatives,
          displaying specific milestones, current funding levels, and ongoing
          updates from cause creators. With this tracking, donors don’t just
          give; they’re continuously engaged and informed on how their support
          directly affects causes they care about—whether it’s providing
          resources, education, vocational training, or support for victims of
          gender-based violence.
          <br />
          <br />
          This real-time tracking is designed to build trust and give our
          supporters peace of mind, reinforcing the impact they’re making toward
          socioeconomic growth. RefreeG’s commitment to clarity and
          accountability empowers every user to see the difference they’re
          making, creating a unique donation experience built on transparency
          and trust.
        </p>
      </section>
    </div>
  );
}
