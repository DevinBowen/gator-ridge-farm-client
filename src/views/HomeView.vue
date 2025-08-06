<template>
  <Navigation />
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to Gator Ridge Farm</h1>
        <p>Fresh eggs, healthy livestock, and honest farm living.</p>
        <button>View Products</button>
      </div>
    </section>

    <section class="about">
      <h2>Our Story</h2>
      <p>
        We’re a small family-run farm passionate about raising healthy animals and offering fresh, local food to our community.
      </p>
    </section>

    <section class="products-preview">
      <h2>Available Now</h2>
      <div class="product-grid">
        <div class="product-card" v-for="item in sampleItems" :key="item.id">
          <img :src="item.image" :alt="item.name" />
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>Want to visit the farm?</h2>
      <button>Contact Us</button>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';

const sampleItems = [
  {
    id: 1,
    name: 'Farm Fresh Eggs',
    description: 'Collected daily from our pasture-raised hens.',
    image: '/images/eggs.jpg',
  },
  {
    id: 2,
    name: 'Laying Hens',
    description: 'Healthy and productive hens ready for your coop.',
    image: '/images/chickens.jpg',
  },
  {
    id: 3,
    name: 'Goat Milk Soap',
    description: 'Handmade soap using our own goat’s milk.',
    image: '/images/soap.jpg',
  },
];
</script>

<style scoped>
.home {
  font-family: 'Segoe UI', sans-serif;
  color: #2c2c2c;
}

.hero {
  position: relative;
  background: url('/images/farm.jpg') no-repeat center center;
  background-size: cover;
  padding: 3rem 1.5rem;
  text-align: center;
  color: white;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}


.hero-content {
  position: relative;
  z-index: 1;
}
.hero-content button {
  padding: 0.75rem 1.5rem;
  background-color: #f4e4c1;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
}

.about,
.products-preview,
.cta {
  padding: 1.5rem;
  text-align: center;
}

.about h2,
.products-preview h2,
.cta h2 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

.product-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
  align-items: center;
}

.product-card {
  background: #fefefe;
  border: 1px solid #eee;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  padding: 1rem;
  text-align: left;
}

.product-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 6px;
}

.product-card h3 {
  font-size: 1.125rem;
  margin: 0.5rem 0 0.25rem;
}

.product-card p {
  font-size: 0.95rem;
  color: #555;
}

.cta button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #86b049;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
}

/* Larger screens (tablet and up) */
@media (min-width: 768px) {
  .hero-content h1 {
    font-size: 3rem;
  }

  .hero-content p {
    font-size: 1.25rem;
  }

  .about,
  .products-preview,
  .cta {
    padding: 3rem;
  }

  .product-grid {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .product-card {
    max-width: 250px;
  }
}
</style>