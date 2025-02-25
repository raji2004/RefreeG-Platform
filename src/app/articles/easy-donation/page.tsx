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
        <h1 className="text-3xl font-bold mb-6">Easy Donation Process</h1>
        <div className="w-full flex justify-center mb-6">
          <Image
            src="/easy-donation.svg"
            alt="Blockchain Transparency"
            width={700}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-justify">
          At RefreeG, we make donating simple, secure, and transparent. Our
          easy-to-use platform ensures that anyone can support a cause in just a
          few clicks. Donors can browse verified campaigns, select a cause they
          believe in, and choose to donate using either Naira or cryptocurrency.
          To make the process seamless, we integrate trusted payment gateways
          like Paystack for Naira donations, allowing funds to go directly to
          the recipient’s bank account.
          <br />
          <br />
          For cryptocurrency donations, transactions are processed through
          secure blockchain smart contracts, ensuring donations reach the
          intended beneficiaries instantly without any middlemen. Every donation
          is recorded on the blockchain, providing a transparent and
          tamper-proof history of contributions. Donors can track their impact
          in real time and see how their contributions are being used. At
          RefreeG, giving is not just easy—it’s secure, verifiable, and
          impactful.
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
