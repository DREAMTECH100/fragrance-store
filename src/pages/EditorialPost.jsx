import { useParams } from "react-router-dom";

const editorialPosts = [
  {
    slug: "architecture-of-a-signature-scent",
    title: "The Architecture of a Signature Scent",
    excerpt: "Layering is deliberate construction...",
    image: "https://thumbs.dreamstime.com/b/luxury-dark-perfume-bottle..."
  },
  {
    slug: "nocturnal-ritual-oud-and-amber",
    title: "Nocturnal Ritual — Oud, Amber, After Dark",
    excerpt: "As light fades...",
    image: "https://thumbs.dreamstime.com/b/luxury-black-obsidian..."
  },
  {
    slug: "the-restraint-of-radiance",
    title: "The Restraint of Radiance — Skincare as Power",
    excerpt: "True luxury is subtraction...",
    image: "https://thumbs.dreamstime.com/b/young-woman-applying..."
  }
];

function EditorialPost() {
  const { slug } = useParams();

  const post = editorialPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div className="p-20 text-center">Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-softwhite text-darktext px-6 py-20">
      <div className="max-w-4xl mx-auto">

        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[400px] object-cover mb-10"
        />

        <h1 className="text-4xl md:text-6xl font-luxury uppercase mb-6">
          {post.title}
        </h1>

        <p className="text-lg leading-relaxed text-darktext/80">
          {post.excerpt}
        </p>

      </div>
    </div>
  );
}

export default EditorialPost;