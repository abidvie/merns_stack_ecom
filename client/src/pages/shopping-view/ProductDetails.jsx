
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  fetchCart,
  addToCart,
} from "../../store/client/product_slice/cart_slice/cart_index";



const Stars = ({ value = 0, readOnly = false, onChange }) => {
  const [hover, setHover] = useState(null);
  const display = hover ?? value;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= display;
        return (
          <button
            key={n}
            type="button"
            className={`transition ${
              readOnly ? "cursor-default" : "cursor-pointer"
            }`}
            onClick={() => !readOnly && onChange?.(n)}
            onMouseEnter={() => !readOnly && setHover(n)}
            onMouseLeave={() => !readOnly && setHover(null)}
            aria-label={`${n} star`}
            disabled={readOnly}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={filled ? "text-amber-500" : "text-slate-300"}
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 17.27l-5.18 3.05 1.39-5.96L3 9.24l6.04-.52L12 3l2.96 5.72 6.04.52-5.21 5.12 1.39 5.96z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

const formatMoney = (n) => {
  if (n === null || n === undefined) return "";
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  return new Intl.NumberFormat("en-BD").format(num);
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quentity, setquentity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  // add-to-cart UI state
  const [adding, setAdding] = useState(false);
  const [addErr, setAddErr] = useState("");

  // demo reviews (replace with backend later)
  const [reviews, setReviews] = useState([
    {
      id: "r1",
      name: "Ayesha",
      rating: 5,
      comment: "Quality is great. Delivery was fast.",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: "r2",
      name: "Rafi",
      rating: 4,
      comment: "Nice product, price could be a bit lower.",
      createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    },
  ]);

  // review form state
  const [yourName, setYourName] = useState("");
  const [yourRating, setYourRating] = useState(5);
  const [yourComment, setYourComment] = useState("");

  // image zoom state
  const [zoom, setZoom] = useState({ x: 50, y: 50, active: false });

  useEffect(() => {
    let mounted = true;

    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:5000/api/shop/product_details/${id}`
        );

        // your backend shape: response.data.data
        const data = response?.data?.data;
        if (mounted) setProduct(data || null);
      } catch (e) {
        if (mounted) setProduct(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProductDetails();
    return () => {
      mounted = false;
    };
  }, [id]);

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ x, y, active: true });
  };

  const handleMouseLeave = () => setZoom((z) => ({ ...z, active: false }));

  const submitReview = (e) => {
    e.preventDefault();
    const name = yourName.trim();
    const comment = yourComment.trim();
    if (!name || !comment) return;

    setReviews((prev) => [
      {
        id: `r_${Date.now()}`,
        name,
        rating: yourRating,
        comment,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    setYourName("");
    setYourRating(5);
    setYourComment("");
  };

  const handleAddToCart = async () => {
    if (!product?._id) return;
    if (product.totalstock <= 0) return;

    setAdding(true);
    setAddErr("");

    try {
      // calls your thunk: addToCart({ productId, quantity })
      await dispatch(
        addToCart({ productId: product._id, quantity: quentity })
      ).unwrap();

      // optional: sync cart state after add
       dispatch(fetchCart());
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.message || err?.error || "Failed to add to cart";
      setAddErr(msg);
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();

    // if add succeeded, go cart/checkout (change route to yours)
    // (basic check: no error + not adding)
    if (!adding && !addErr) navigate("/cart");
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product) return <div className="p-6">Product not found.</div>;

  const hasSale =
    product.saleprice !== null &&
    product.saleprice !== undefined &&
    Number(product.saleprice) > 0 &&
    Number(product.saleprice) < Number(product.price);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Image */}
          <div>
            <div
              className="relative overflow-hidden rounded-2xl border bg-slate-100"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-[520px] w-full object-cover"
                draggable={false}
              />

              {/* Zoom overlay */}
              {zoom.active && (
                <div className="pointer-events-none absolute inset-0">
                  <div
                    className="absolute inset-0 opacity-100"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "200% 200%",
                      backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                      filter: "contrast(1.02)",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              )}
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Hover to zoom • Image will zoom where your cursor is
            </p>
          </div>

          {/* Details */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-semibold text-slate-900">
                {product.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                  Brand: <span className="font-medium">{product.brand}</span>
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                  Category:{" "}
                  <span className="font-medium">{product.category}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Stars value={Math.round(avgRating)} readOnly />
                <div className="text-sm text-slate-600">
                  {avgRating} • {reviews.length} reviews
                </div>
              </div>

              <div className="mt-2 flex items-end gap-3">
                {hasSale ? (
                  <>
                    <div className="text-3xl font-bold text-slate-900">
                      ৳{formatMoney(product.saleprice)}
                    </div>
                    <div className="pb-1 text-lg text-slate-400 line-through">
                      ৳{formatMoney(product.price)}
                    </div>
                    <span className="mb-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      SALE
                    </span>
                  </>
                ) : (
                  <div className="text-3xl font-bold text-slate-900">
                    ৳{formatMoney(product.price)}
                  </div>
                )}
              </div>

              <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Availability</span>
                  <span className="font-semibold text-emerald-700">
                    {product.totalstock > 0
                      ? `${product.totalstock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
              </div>

              <p className="mt-2 leading-relaxed text-slate-700">
                {product.description}
              </p>

              {/* Actions */}
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex w-full max-w-[160px] items-center overflow-hidden rounded-xl border bg-white">
                  <button
                    className="w-12 py-3 text-lg text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    disabled={adding || quentity <= 1}
                    onClick={() => {
                      if (quentity > 1) setquentity((prev) => prev - 1);
                    }}
                  >
                    −
                  </button>

                  <div className="flex-1 text-center font-medium">
                    {quentity}
                  </div>

                  <button
                    className="w-12 py-3 text-lg text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    disabled={
                      adding ||
                      product.totalstock <= 0 ||
                      quentity >= (product.totalstock || quentity)
                    }
                    onClick={() => {
                      setquentity((prev) =>
                        Math.min(prev + 1, product.totalstock || prev + 1)
                      );
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={product.totalstock <= 0 || adding}
                  type="button"
                  onClick={handleAddToCart}
                >
                  <span>🛒</span> {adding ? "Adding..." : "Add to cart"}
                </button>

                <button
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={product.totalstock <= 0 || adding}
                  type="button"
                  onClick={handleBuyNow}
                >
                  <span>⚡</span> Buy Now
                </button>
              </div>

              {addErr ? (
                <p className="text-sm text-red-600">{addErr}</p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: Reviews list */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Reviews</h2>
              <div className="text-sm text-slate-600">
                Average: {avgRating} / 5
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-slate-900">{r.name}</div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Stars value={r.rating} readOnly />
                      <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Add review */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Write a review
            </h3>

            <form onSubmit={submitReview} className="mt-4 space-y-3">
              <div>
                <label className="text-sm text-slate-600">Your name</label>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="e.g., Rifat"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Rating</label>
                <div className="mt-1">
                  <Stars value={yourRating} onChange={setYourRating} />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-600">Comment</label>
                <textarea
                  className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
                  value={yourComment}
                  onChange={(e) => setYourComment(e.target.value)}
                  placeholder="Write your experience..."
                  rows={4}
                />
              </div>

              <button
                className="w-full rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
                type="submit"
              >
                Submit review
              </button>

              <p className="text-xs text-slate-500">
                Later you can connect this to backend: save review + rating in
                DB.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
