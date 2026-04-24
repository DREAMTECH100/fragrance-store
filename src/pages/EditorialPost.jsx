import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EditorialPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${baseURL}/api/editorial/${slug}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("EDITORIAL FETCH ERROR:", err);
      }
    };

    fetchPost();
  }, [slug, baseURL]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-softwhite text-darktext px-6 py-24">
      <div className="max-w-4xl mx-auto">

        {/* HERO IMAGE */}
        <img
          src={
            post.image?.startsWith("http")
              ? post.image
              : `${baseURL}${post.image}`
          }
          alt={post.title}
          className="w-full h-[450px] object-cover rounded-xl shadow-xl mb-12"
        />

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-luxury uppercase tracking-[0.2em] mb-6">
          {post.title}
        </h1>

        {/* SUB HEADLINE */}
        <p className="text-lg italic text-darktext/70 mb-10 leading-relaxed">
          {post.tagline ||
            "A composition of scent, memory, and silent identity."}
        </p>

        {/* MAGAZINE BODY */}
        <div className="space-y-8 text-base md:text-lg leading-relaxed text-darktext/80">

          {/* OPENING */}
          <p>
            In the world of fragrance, scent is never just worn — it is entered.
            It becomes architecture around the body, shaping presence before
            words ever arrive.
          </p>

          {/* STORY LAYER */}
          <p>
            {post.title} unfolds like a narrative written in invisible ink.
            The first impression is fleeting — a whisper of top notes that
            vanish almost as quickly as they appear. Yet they leave a question
            behind: *who just entered the room?*
          </p>

          {/* SCENT PROFILE */}
          <div className="border-l-2 border-black/20 pl-6">
            <h3 className="uppercase tracking-[0.25em] text-sm mb-2">
              Fragrance Composition
            </h3>

            <p>
              Top Notes: Citrus brightness, airy aldehydes, first impression spark<br />
              Heart Notes: Floral depth, soft spice, emotional warmth<br />
              Base Notes: Oud, amber, musk — the memory that lingers
            </p>
          </div>

          {/* EMOTIONAL INTERPRETATION */}
          <p>
            This is not a fragrance that asks for attention. It commands it
            silently. It does not announce arrival — it reshapes atmosphere.
          </p>

          {/* LUXURY STATEMENT */}
          <p className="italic text-darktext/70">
            “True luxury is not seen. It is remembered.”
          </p>

        </div>

        {/* CLOSING LINE */}
        <div className="mt-16 border-t pt-8 text-sm uppercase tracking-widest text-darktext/60">
          Private Notes • Fragrance Editorial Archive
        </div>

      </div>
    </div>
  );
}

export default EditorialPost;