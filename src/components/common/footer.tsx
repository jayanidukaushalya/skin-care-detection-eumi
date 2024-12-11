import Image from "next/image"

const Footer = () => {
  return (
    <footer className="absolute inset-x-0 bottom-0">
      <Image
        src="/assets/footer.svg"
        alt="footer"
        width={0}
        height={0}
        sizes="100vw"
        className="object-cover w-full h-20 sm:h-28 md:h-32 lg:h-40 xl:h-48 2xl:h-60"
      />
    </footer>
  )
}

export default Footer
