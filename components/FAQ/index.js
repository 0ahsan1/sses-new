import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export function FAQ({ data }) {
	const [value, setValue] = useState(null);
	
	useEffect(() => {
		setValue(null);
	}, [data])
	
	return (
		data && (
			<div className="bg-white dark:bg-gray-900">
				<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:pb-40">
					<div className="mx-auto max-w-4xl">
						<h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
							{data.title}
						</h2>
						<Accordion
							type="single"
							collapsible
							className="mt-16 space-y-4"
							value={value}
							onValueChange={setValue}
						>
							{data.items.map((faq, index) => (
								<AccordionItem
									key={faq.title}
									value={index.toString()}
									className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
								>
									<AccordionTrigger
										className={cn(
											"flex w-full items-center justify-between p-6 text-left hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800",
											"focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
										)}
									>
                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                      {faq.title}
                    </span>
									</AccordionTrigger>
									<AccordionContent className="px-6 pb-4 pt-0">
										<div
											className="text-gray-600 dark:text-gray-400"
											dangerouslySetInnerHTML={{ __html: faq.description }}
										/>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</div>
		)
	)
}
