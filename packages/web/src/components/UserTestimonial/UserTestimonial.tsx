import Image from 'next/image'
import React from 'react'

interface TestimonialProps {
  name: string
  role: string
  testimonial: string
  imageUrl?: string
}

const UserTestimonial: React.FC<TestimonialProps> = ({
  name,
  role,
  testimonial,
  imageUrl,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 text-center">
      {imageUrl && (
        <div className="mb-4">
          <Image
            src={imageUrl}
            alt={name}
            width={100}
            height={100}
            className="rounded-full mx-auto"
          />
        </div>
      )}
      <blockquote className="italic text-gray-600">{testimonial}</blockquote>
      <p className="font-bold text-gray-800 mt-4">{name}</p>
      <p className="text-gray-500">{role}</p>
    </div>
  )
}

export default UserTestimonial
