<div className="relative h-screen text-white">
  <img
    className="absolute left-0 top-0 w-full h-full object-cover -z-50"
    src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
    alt="Hero image"
    onLoad={() => setImageLoading(false)}
  />
  <div
    className="absolute left-0 top-0 w-full h-full bg-black/50 -z-50"
    aria-hidden="true"
  />
  <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center  px-8 md:px-16 lg:px-32 z-10">
    <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

    <div className="max-w-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
        <div className="mb-4 md:mb-0">
          <h2 className="md:text-5xl text-2xl font-bold text-balance">
            {content?.title || content?.name}
          </h2>
          <p className="mt-2 text-sm md:text-lg">
            {formatReleaseDate(
              content?.release_date || content?.first_air_date
            )}{" "}
            |{" "}
            {content?.adult ? (
              <span className="text-red-600">18+</span>
            ) : (
              <span className="text-green-600">PG-13</span>
            )}
          </p>
          <p className="mt-4 text-sm md:text-lg">{content?.overview}</p>
        </div>
        <img
          src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
          alt={content?.title || content?.name}
          className="max-h-[600px] w-full width-poster rounded-md"
        />
      </div>
    </div>
  </div>
</div>;
