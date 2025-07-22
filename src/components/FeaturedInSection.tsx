import Image from "next/image";

export function FeaturedInSection() {
  return (
    <section className="px-4 pt-12 pb-6 relative bg-white/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
          As Featured In
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 items-center opacity-70">
          {/* Product Hunt */}
          <div className="flex items-center justify-center">
            <Image
              src={"/ProductHunt.png"}
              alt="Product Hunt"
              width={200}
              height={200}
            />
          </div>

          {/* Handmade Business Magazine */}
          <div className="flex items-center justify-center">
            <Image
              src={"/SaaSHub.png"}
              alt="SaaSHub"
              width={180}
              height={180}
            />
          </div>

          {/* Small Business Trends */}
          <div className="flex items-center justify-center">
            <Image src={"/Reddit.png"} alt="Reddit" width={110} height={110} />
          </div>

          {/* Craft Industry Alliance */}
          <div className="flex items-center justify-center">
            <Image
              src={"/Solopush.png"}
              alt="Solopush"
              width={140}
              height={140}
            />
          </div>
        </div>

        {/* <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            &ldquo;Finally, a bookkeeping solution that understands the unique
            needs of handmade sellers.&rdquo;
          </p>
          <p className="text-sm text-gray-400 mt-1">
            — Sarah M., Featured Etsy Seller
          </p>
        </div> */}
      </div>
    </section>
  );
}
