"use client";

import { Trip, TripImage } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

export default function DetailTripImage({ trip }: { trip: Trip & { images: TripImage[] } | null }) {

    const [selectedImage, setSelectedImage] = useState(trip?.images[0] || { imageUrl: '/images/placeholder.png' });

    return (
        <div className="space-y-6">
            {/* Zoomed Image */}
            <Image
                src={selectedImage?.imageUrl || '/images/placeholder.png'}
                alt="Trip Image"
                width={1000}
                height={400}
                className="w-full h-[400px] rounded-lg shadow-md object-cover"
            />
            <div className="flex gap-5">
                { trip?.images && trip.images.map((image, i:number) => (
                    <div key={i} onClick={() => setSelectedImage(image)} className="cursor-pointer hover:scale-105 transform duration-200">
                        <Image
                            src={image.imageUrl||'/images/placeholder.png'} 
                            alt={`Trip Image ${i + 1}`} 
                            width={230}
                            height={20}
                            className="rounded-lg shadow-md object-cover h-20" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}