// src/components/PokemonCarousel.js
import React from 'react';
import Slider from 'react-slick';
import PokemonCard from './PokemonCard';

const PokemonCarousel = ({ pokemons, onSelect }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div style={{ margin: '40px 0' }}>
      <Slider {...settings}>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id}>
            <PokemonCard pokemon={pokemon} onSelect={onSelect} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PokemonCarousel;


