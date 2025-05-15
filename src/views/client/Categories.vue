<template>
  <div class="categories-page">
    <dashboard-banner>
      <template #banner-body>
        <div class="categories-header">
          <h1>Categories</h1>
        </div>
      </template>
    </dashboard-banner>

    <div class="container-lg">
      <div class="categories-container">
        <!-- Loading Spinner -->
        <div v-if="isLoading" class="loading-spinner">
          <i class="fa fa-spinner fa-spin fa-2x"></i>
        </div>

        <!-- No Categories Found -->
        <div v-else-if="allCategiries.length === 0" class="empty-state">
          <p>No categories available</p>
        </div>

        <!-- Category Cards Grid -->
        <div v-else class="category-grid">
          <div 
            class="category-card-wrapper"
            v-for="(category, index) in allCategiries"
            :key="index"
          >
            <CategoryCard
              :description="category.description"
              :title="category.title"
              :img="category.imageUrl"
              :prodId="category.id"
            >
              <template #card-content>
                <router-link
                  class="view-products-btn"
                  :to="{
                    name: 'client.categories.products',
                    params: { id: category.id },
                  }"
                >
                  View Products
                </router-link>
              </template>
            </CategoryCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardBanner from "../../components/client/DashboardBanner.vue";
import CategoryCard from "../../components/client/CategoryCard.vue";
import ApiServices from "../../services/ApiServices";

export default {
  components: {
    DashboardBanner,
    CategoryCard
  },
  data() {
    return {
      allCategiries: [],
      isLoading: false,
    };
  },
  methods: {
    getAllCategory() {
      this.isLoading = true;
      ApiServices.getAllCategory()
        .then(async (response) => {
          const categories = response.data.data;
          const categoriesWithImages = await Promise.all(
            categories.map(async (category) => {
              try {
                const imageResponse = await ApiServices.getCatetoryImage(
                  category.category_image
                );
                const blob = new Blob([imageResponse.data], {
                  type: imageResponse.headers["content-type"],
                });
                category.imageUrl = URL.createObjectURL(blob);
              } catch (err) {
                category.imageUrl = null;
              }
              return category;
            })
          );
          this.allCategiries = categoriesWithImages;
        })
        .catch(console.error)
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.getAllCategory();
  }
};
</script>

<!-- <style lang="scss" scoped>
.categories-page {
  background-color: #111827;
  min-height: 100vh;
  padding-bottom: 2rem;
}

.categories-header {
  padding: 1.5rem 0;
  text-align: center;
  
  h1 {
    color: #f9fafb;
    font-size: 2.5rem;
    font-weight: 600;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.categories-container {
  padding: 1rem;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  padding: 3rem;
  color: #cc5500;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #9ca3af;
  font-size: 1.2rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.category-card-wrapper {
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
}

.view-products-btn {
  display: block;
  background: rgba(204, 85, 0, 0.1);
  color: #ff8c42;
  border: 1px solid #cc5500;
  border-radius: 6px;
  padding: 0.6rem 1rem;
  text-align: center;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(204, 85, 0, 0.2);
    color: #ff9d5c;
  }
}

@media (max-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
  
  .categories-header h1 {
    font-size: 2rem;
  }
}
</style> -->
<style>
.categories-page {
  background-color: #ffff; 
  min-height: 100vh;
  padding-bottom: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #f1f5f9;
}

.categories-header {
  background: linear-gradient(90deg, #1f2937, #111827);
  padding: 2rem 1rem;
  text-align: center;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

  h1 {
    font-size: 2.75rem;
    font-weight: 700;
    color: #f9fafb;
    margin: 0;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  }
}

.categories-container {
  padding: 2rem 1.5rem;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  color: #f97316;
  font-size: 1.8rem;
}

.empty-state {
  text-align: center;
  padding: 4rem;
  color: #9ca3af;
  font-size: 1.2rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
}

.category-card-wrapper {
  background-color: #1e293b;
  padding: 1rem;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }
}

.view-products-btn {
  margin-top: 1rem;
  display: inline-block;
  background: #f97316;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-align: center;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: #fb923c;
    color: #fff;
  }
}

@media (max-width: 768px) {
  .categories-header h1 {
    font-size: 2rem;
  }

  .category-grid {
    gap: 1.2rem;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  .view-products-btn {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
}

</style>