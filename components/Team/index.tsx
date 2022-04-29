const Team = () => {
  return (
    <section
      id="team"
      className="gallery container relative mx-auto bg-repeat py-12 heropattern-plus-gray-700"
    >
      <h3 className="mb-8 text-center text-3xl font-semibold underline decoration-indigo-500/80 lg:text-left xl:text-4xl">
        Team
      </h3>
      <div className="react-multi-carousel-list team-slider ">
        <ul
          className="react-multi-carousel-track "
          style={{
            transition: 'none',
            overflow: 'unset',
            transform: 'translate3d(0px,0,0)',
          }}
        />
      </div>
    </section>
  );
};

export { Team };
