function ImageCarousel({ images }) {
    return (
      <div className="text-center rounded-xl bg-slate-100 dark:bg-gray-600">
        <div className="mt-10 md:mb-0 mb-10 inline-block">
          <span className="font-bold text-2xl">Spare Change</span>
          <div className="carousel mt-6 w-full">
            {images.map((img, k) => (
              <div
                id={"slide" + (k + 1)}
                key={k}
                className="carousel-item relative w-full"
              >
                <div className="w-full h-96">
                  <img
                    src={img.imageUrl}
                    className="w-full object-cover rounded px-6 h-72"
                    alt={img.title}
                  />
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-0">
                  <a
                    href={`#slide${k !== 0 ? k : 5}`}
                    className="btn btn-circle btn-ghost"
                  >
                    ❮
                  </a>
                  <h3 className="text-sm mt-4">{img.title} </h3>
                  <a
                    href={`#slide${k === 4 ? 1 : k + 2}`}
                    className="btn btn-circle btn-ghost"
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default ImageCarousel;
  