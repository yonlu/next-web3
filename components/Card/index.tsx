interface CardProps {
  imageUrl?: string;
  name?: string | null;
}

const imageSrc =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89J3hNaW5ZTWluIG1lZXQnIHZpZXdCb3g9JzAgMCAzNTAgMzUwJz48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDI0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyM0RUE4REUnLz48dGV4dCB4PSc1MCUnIHk9JzM1JScgY2xhc3M9J2Jhc2UnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIHRleHQtYW5jaG9yPSdtaWRkbGUnPlF1aWV0PC90ZXh0Pjx0ZXh0IHg9JzUwJScgeT0nNDUlJyBjbGFzcz0nYmFzZScgZG9taW5hbnQtYmFzZWxpbmU9J21pZGRsZScgdGV4dC1hbmNob3I9J21pZGRsZSc+QmFzaDwvdGV4dD48dGV4dCB4PSc1MCUnIHk9JzU1JScgY2xhc3M9J2Jhc2UnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIHRleHQtYW5jaG9yPSdtaWRkbGUnPlVJIERldmVsb3BlcjwvdGV4dD48L3N2Zz4=';

const Card = ({ imageUrl = imageSrc, name }: CardProps) => {
  return (
    <div className="card w-60 bg-base-100 shadow-xl scale-100 transition-all hover:scale-105">
      <figure>
        <img className="object-contain" src={imageUrl} alt="Shoes" />
      </figure>
      <div className="card-body h-2/6">
        <h2 className="card-title">{name}</h2>
        <div className="card-actions justify-end">
          <button className="btn-sm btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export { Card };
