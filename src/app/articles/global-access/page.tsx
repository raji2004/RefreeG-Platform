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
        <h1 className="text-3xl font-bold mb-6">Global Access</h1>
        <div className="w-full flex justify-center mb-6">
          <Image
            src="/global-access.svg"
            alt="Blockchain Transparency"
            width={700}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-justify">
          At RefreeG, we believe that financial support for education should
          have no borders. Our platform is designed to connect donors and
          beneficiaries from anywhere in the world, making it easy for people to
          contribute to meaningful causes, no matter their location. With
          support for both traditional and cryptocurrency donations, RefreeG
          allows individuals and organizations across the globe to donate
          seamlessly. Whether you're contributing in Naira or using
          blockchain-based payments, our system ensures that funds reach the
          intended recipients securely and efficiently.
          <br />
          <br />
          Blockchain technology enhances this global access by providing a
          transparent, tamper-proof record of all transactions. Donors can track
          their contributions in real time, while beneficiaries can showcase
          their progress and impact updates to a worldwide audience. By breaking
          down geographical barriers, RefreeG makes it possible for anyone,
          anywhere, to support education and drive positive change.
          <br />
          <br />
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
