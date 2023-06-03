// /post/any-url-relative-to-post
import { sanityClient, urlFor } from "../../sanity";
import React from "react";
import Header from "../../components/Header";
import { Post } from "../../typings";
import { GetStaticProps } from "next";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
interface Props {
	post: Post;
}

interface IFormInput {
	_id: string;
	name: string;
	email: string;
	comment: string;
}

const Post = ({ post }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		try {
			const response = await fetch("/api/createComment", {
				method: "POST",
				body: JSON.stringify(data),
			});
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main>
			<Header />

			<img
				src={urlFor(post.mainImage).url() as string}
				className="w-full h-40 object-cover"
				alt=""
			/>

			<article className="max-w-3xl mx-auto p-5">
				<h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
				<h2 className="text-xl font-light text-gray-500 mb-2">
					{post.description}
				</h2>
				<div className="flex items-center space-x-2">
					<img
						className="h-10 w-10 rounded-full"
						src={urlFor(post.author.image).url() as string}
						alt=""
					/>
					<p className="font-light text-sm">
						Blog Post by{" "}
						<span className="text-green-600">
							{post.author.name}
						</span>{" "}
						- Published at{" "}
						{new Date(post._createdAt).toLocaleString()}
					</p>
				</div>

				<div className="mt-10">
					<PortableText
						className=""
						dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
						projectId={process.env.NEXT_PUBLIC_PROJECT_ID!}
						content={post.body}
						serializers={{
							h1: (props: any) => (
								<h1
									className="text-2xl font-bold my-5"
									{...props}
								/>
							),
							h2: (props: any) => (
								<h1
									className="text-xl font-bold my-5"
									{...props}
								/>
							),
							li: ({ children, href }: any) => (
								<li className="ml-4 list-disc">{children}</li>
							),
							link: ({ href, children }: any) => (
								<a
									href={href}
									className="text-blue-500 hover:underline"
								>
									{children}
								</a>
							),
						}}
					/>
				</div>
			</article>
			<hr className="max-w-lg my-5 mx-auto border border-yellow-500 " />
			<form
				className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h3 className="text-sm text-yellow-500">
					Enjoyed this article?
				</h3>
				<h4 className="text-3xl font-bold">Leave a comment below!</h4>
				<hr className="py-3 mt-2" />
				<input
					{...register("_id")}
					type="hidden"
					name="_id"
					value={post._id}
				/>
				<label className="block mb-5 ">
					<span className="text-gray-100 ">Name</span>
					<input
						{...register("name", { required: true })}
						className="shadow border rounded py-2 px-3 form-input mt-1 block w-full  outline-none focus:ring ring-yellow-500"
						type="text"
						placeholder="John Doe"
					/>
				</label>
				<label className="block mb-5 ">
					<span className="text-gray-100 ">Email</span>
					<input
						{...register("email", { required: true })}
						className="shadow border rounded py-2 px-3 form-input mt-1 block w-full  outline-none focus:ring     ring-yellow-500"
						type="email"
						placeholder="john.doe@example.com"
					/>
				</label>
				<label className="block mb-5 ">
					<span className="text-gray-100 ">Comment</span>
					<textarea
						{...register("comment", { required: true })}
						className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
						rows={8}
						placeholder="John Doe"
					/>
				</label>

				{/* errors will return when field validation fails */}
				<div className="flex flex-col p-5">
					{errors.name && (
						<span className="text-red-500">
							- The Name field is required
						</span>
					)}
					{errors.comment && (
						<span className="text-red-500">
							- The Comment field is required
						</span>
					)}
					{errors.email && (
						<span className="text-red-500">
							- The Email field is required
						</span>
					)}
				</div>
				<input
					type="submit"
					className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
				/>
			</form>
		</main>
	);
};

export default Post;

export const getStaticPaths = async () => {
	const query = `
                *[_type=="post"] {
                  _id,
                  slug {
                    current
                  }
                }
  `;
	const posts = await sanityClient.fetch(query);

	const paths = posts.map((post: Post) => ({
		params: { slug: post.slug.current },
	}));

	// https://dev.to/tomdohnal/blocking-fallback-for-getstaticpaths-new-next-js-10-feature-1727
	return { paths, fallback: "blocking" };
};

// query: *[_type=="post" && slug.current == $slug][0] {
//   _id,_createdAt,title,author->{name,image},
// 'comments':*[_type=="comment"&& post._ref==^._id&&approved==true],description,mainImage,slug,body
// }
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `*[_type=="post" && slug.current == $slug][0] {
  _id,_createdAt,title,author->{name,image},
'comments':*[_type=="comment"&& post._ref==^._id&&approved==true],description,mainImage,slug,body
}`;

	const post = await sanityClient.fetch(query, { slug: params?.slug });

	return post ? { props: { post }, revalidate: 60 } : { notFound: true };
};
