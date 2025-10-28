
import Image from 'next/image'

export function Logo() {
  return (
    <Image
      src="/logo.avif"
      alt="Southern Haulers Logo"
      width={180}
      height={60}
      className="h-12 w-auto object-contain dark:brightness-110"
      priority
    />
  )
}
