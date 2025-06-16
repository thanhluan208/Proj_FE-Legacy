"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

type Card = {
	id: string
	title: string
	description: string
	image: string
	index: number
}

interface CardStackProps extends React.HTMLProps<HTMLDivElement> {
	items: Card[]
	offset?: number
	scaleFactor?: number
}

export const CardStack = ({
	items,
	offset,
	scaleFactor,
	className
}: CardStackProps) => {
	const CARD_OFFSET = offset || 10
	const SCALE_FACTOR = scaleFactor || 0.06
	const [cards, setCards] = useState<Card[]>(items)

	useEffect(() => {
		const interval = setTimeout(() => {
			setCards((prevCards: Card[]) => {
				const newArr = [...prevCards] // create a copy of the array

				newArr.push(newArr.shift() as Card)

				return newArr
			})
		}, 5000)

		return () => clearInterval(interval)
	}, [cards])

	return (
		<div className={cn("relative ", className)}>
			{cards.map((card, index) => {
				return (
					<motion.div
						key={card.id}
						className={cn(
							"p-6",
							"absolute bg-white w-full h-full md:p-10 rounded-[28px] border-2 border-[#E7E8EC]  shadow-[0px_4px_8px_rgba(0,0,0,0.04)] grid grid-cols-2 gap-[60px]"
						)}
						style={{
							transformOrigin: "top center"
						}}
						animate={{
							top: index * -CARD_OFFSET,
							scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
							zIndex: cards.length - index //  decrease z-index for the cards that are behind
						}}
						onClick={() => {
							setCards((prevCards: Card[]) => {
								const newArr = [...prevCards] // create a copy of the array

								newArr.push(newArr.shift() as Card)

								return newArr
							})
						}}
					>
						<div className="col-span-1 flex items-start justify-center gap-6 flex-col">
							<p className="text-primary">{`// Step ${card.index}`}</p>
							<div>
								<p
									className={cn(
										"text-md leading-4",
										"md:text-[28px] md:leading-8 font-[500]"
									)}
								>
									{card.title}
								</p>
								<p className="text-xs md:text-base mt-3">{card.description}</p>
							</div>
						</div>
						<div className="col-span-1 max-h-[100%] overflow-hidden">
							<Image
								src={card.image}
								alt={card.title}
								fill
								className="!w-full !static object-fill rounded-[16px] object-center "
							/>
						</div>
					</motion.div>
				)
			})}
		</div>
	)
}
