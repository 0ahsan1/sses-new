import Image from "next/image";
import {strapiImageLoader} from "@/services/ApiService";

const people = [
	{
		name: 'Leonard Krasner',
		role: 'Senior Designer',
		imageUrl:
			'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
		xUrl: '#',
		linkedinUrl: '#',
	},
	{
		name: 'Floyd Miles',
		role: 'Principal Designer',
		imageUrl:
			'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
		xUrl: '#',
		linkedinUrl: '#',
	},
	{
		name: 'Emily Selman',
		role: 'VP, User Experience',
		imageUrl:
			'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
		xUrl: '#',
		linkedinUrl: '#',
	},
	{
		name: 'Kristin Watson',
		role: 'VP, Human Resources',
		imageUrl:
			'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
		xUrl: '#',
		linkedinUrl: '#',
	},
	{
		name: 'Emma Dorsey',
		role: 'Senior Developer',
		imageUrl:
			'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
		xUrl: '#',
		linkedinUrl: '#',
	},
	{
		name: 'Alicia Bell',
		role: 'Junior Copywriter',
		imageUrl:
			'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
		xUrl: '#',
		linkedinUrl: '#',
	},
]

export default function Team({data}) {
	console.log('team data',data)
	return (
		<div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
			<div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
				<div className="mx-auto max-w-2xl">
					<h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
						{data.title}
					</h2>
					<div className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{__html: data.description}}>
					</div>
				</div>
				<ul
					role="list"
					className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
				>
					{data.items.map((person) => (
						<li key={person.title} className="rounded-2xl bg-gray-100 px-8 py-10 dark:bg-gray-800">
							<Image
								alt={person.title}
								width={40}
								height={40}
								loader={strapiImageLoader}
								src={person?.image?.url ?? '#'}
								className="mx-auto size-48 rounded-full outline outline-1 -outline-offset-1 outline-black/5 md:size-56 dark:outline-white/10"
							/>
							<h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-white">
								{person.title}
							</h3>
							<p className="text-sm/6 text-gray-600 dark:text-gray-400">{person.description}</p>
							<ul role="list" className="mt-6 flex justify-center gap-x-6">
								<li>
									<a
										href={person.button[0].link ?? '#'}
										className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
									>
										<span className="sr-only">Facebook</span>
										<svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
											<path
												d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.793C0 19.506.494 20 1.104 20h9.58v-7.745H8.036V9.239h2.647V7.01c0-2.625 1.602-4.055 3.94-4.055 1.12 0 2.084.083 2.363.12v2.743h-1.62c-1.274 0-1.52.606-1.52 1.47v1.928h2.773l-.363 2.018h-2.41V20h4.735c.61 0 1.104-.494 1.104-1.104V1.104C20 .494 19.506 0 18.896 0z"
												clipRule="evenodd"
												fillRule="evenodd"
											/>
										</svg>
									</a>
								</li>
								<li>
									<a
										href={person.button[1].link ?? '#'}
										className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
									>
										<span className="sr-only">LinkedIn</span>
										<svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
											<path
												d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
												clipRule="evenodd"
												fillRule="evenodd"
											/>
										</svg>
									</a>
								</li>
								<li>
									<a
										href={person.button[2].link?? '#'}
										className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
									>
										<span className="sr-only">YouTube</span>
										<svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
											<path
												d="M18.8 3.4c-.7-.3-2.3-.6-4.5-.6H5.7c-2.2 0-3.8.3-4.5.6C.5 3.7 0 4.2 0 5.2v9.6c0 1 .5 1.5 1.2 1.8.7.3 2.3.6 4.5.6h8.6c2.2 0 3.8-.3 4.5-.6.7-.3 1.2-.8 1.2-1.8V5.2c0-1-.5-1.5-1.2-1.8zM7.5 13.2V6.8l5.3 3.2-5.3 3.2z"
												clipRule="evenodd"
												fillRule="evenodd"
											/>
										</svg>
									</a>
								</li>
							</ul>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
