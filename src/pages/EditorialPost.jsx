import { useParams } from "react-router-dom";

const editorialPosts = [
  {
    slug: "architecture-of-a-signature-scent",
    title: "The Architecture of a Signature Scent",
    excerpt: "Layering is deliberate construction...",
    image: "https://thumbs.dreamstime.com/b/luxury-dark-perfume-bottle.jpg",
    content: `
## The Opening

A fragrance is never worn. It is entered.

## Composition

Top Notes: Citrus spark, clean aldehydes  
Heart Notes: Floral tension, soft spice  
Base Notes: Oud, amber, musk  

> True luxury is presence without noise.

This is a scent that does not ask for attention — it rearranges it.
`
  },
  {
    slug: "nocturnal-ritual-oud-and-amber",
    title: "Nocturnal Ritual — Oud, Amber, After Dark",
    excerpt: "As light fades...",
    image: "https://thumbs.dreamstime.com/b/luxury-black-obsidian.jpg",
    content: `
## After Dark

This is where silence becomes expensive.

## Scent Profile

Top: Smoke, citrus peel  
Heart: Resin, dark florals  
Base: Oud, amber, leather  

> Some scents are not worn — they are inhabited.

Night transforms this fragrance into identity.
`
  },
  {
    slug: "the-restraint-of-radiance",
    title: "The Restraint of Radiance — Skincare as Power",
    excerpt: "True luxury is subtraction...",
    image: "https://thumbs.dreamstime.com/b/young-woman-applying.jpg",
    content: `
## Ritual

Luxury begins when excess is removed.

## Philosophy

Minimal steps. Maximum discipline.  
Skin that does not shout — it commands quietly.

> Radiance is restraint perfected.

This is skincare as identity, not routine.
`
  }
];

function EditorialPost() {
  const { slug } = useParams();

  const post = editorialPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Post not found
      </div>
    );
  }

  const formatContent = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("##")) {
        return (
          <h2 key={i} className="text-2xl font-luxury uppercase mt-8 mb-4">
            {line.replace("##", "")}
          </h2>
        );
      }

      if (line.startsWith(">")) {
        return (
          <p key={i} className="italic border-l-2 pl-4 my-4 text-gray-600">
            {line.replace(">", "")}
          </p>
        );
      }

      return (
        <p key={i} className="leading-relaxed my-2 text-gray-700">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-softwhite px-6 py-20 text-darktext">
      <div className="max-w-4xl mx-auto">

        {/* IMAGE */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[450px] object-cover rounded-xl mb-10"
        />

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-luxury uppercase mb-4 tracking-widest">
          {post.title}
        </h1>

        {/* EXCERPT */}
        <p className="italic text-gray-600 mb-10">
          {post.excerpt}
        </p>

        {/* MAGAZINE CONTENT */}
        <div>{formatContent(post.content)}</div>

      </div>
    </div>
  );
}

export default EditorialPost;