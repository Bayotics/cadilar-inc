<template>
  <div>
    <div class="lookup-prebody" style= "background-color:#e5e5e9">
      <AppHero />
      <div class="meetup-lookup-wrap" >
        <div id = "meetup-lookup-background" class="meetup-lookup centered">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <input v-model="searchedLocation"
                       @keyup.enter="fetchMeetups"
                       type="text"
                       class="input"
                       placeholder="Input Location and Press Enter">
              </div>
              <div v-if="searchedLocation && meetups && meetups.length > 0" class="level-item">
                <span>Trades in {{meetups[0].location}}</span>
              </div>
              <div v-if="category" class="level-item">
                <button @click="cancelCategory" class="button is-danger">{{category}} X</button>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <!-- <button class="button is-medium">Calendar</button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="pageLoader_isDataLoaded" class="container">
       <section class="section page-find">
                    <h1>Cars near you</h1>
        <div v-if="meetups && meetups.length > 0" class="columns cover is-multiline">
          <div v-for="meetup of meetups" :key="meetup._id" class="column is-one-third" :style="{'min-height': '160px'}">
            <router-link :to="'/meetups/' + meetup._id" class="meetup-card-find"
               href="#"
               :style="{'background-image': `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${meetup.image})`}">
              <div class="meetup-card-find-content">
                <div class="meetup-card-find-content-date is-pulled-right">
                  <span class="month">{{meetup.startDate | formatDate('MMM')}}</span>
                  <span class="day">{{meetup.startDate | formatDate('D')}}</span>
                </div>
                <div class="meetup-card-find-content-info">
                  <p class="title is-4 no-padding is-marginless m-b-xs">{{meetup.title}}</p>
                  <span style = "background-color: #209cee" class="tag is-success m-b-xs">{{meetup.category.name | capitalize}}</span>
                  <p class="subtitle is-7">{{meetup.location}}</p>
                </div>
                <div class="meetup-card-find-interest">
                  <!-- <p class="subtitle is-7">{{meetup.joinedPeopleCount}}</p> -->
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div v-else>
          <span class="tag is-warning is-large">No Cars found</span>
        </div>
      </section>
      <section class="section">
        <div>
          <h2>Find by Categories</h2>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline is-mobile">
            <CategoryItem v-for="category in categories"
                          :key="category._id"
                          :category="category" />
          </div>
        </div>
      </section>
      <section class="section">
        <div>
          <h2>Find by Price</h2>
          <h1 class="title">Price</h1>
          <div class="columns cover is-multiline is-mobile">
            <PriceItem v-for="price in prices"
                          :key="price._id"
                          :price="price" />
          </div>
        </div>
      </section>
      <section class="section">
        <div>
          <h2>Find by Brands</h2>
          <h1 class="title">Brands</h1>
          <div class="columns cover is-multiline is-mobile">
            <BrandItem v-for="brand in brands"
                          :key="brand._id"
                          :brand="brand" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CategoryItem from "@/components/CategoryItem";
import BrandItem from "@/components/BrandItem";
import PriceItem from "@/components/PriceItem";
// import MeetupItem from '@/components/MeetupItem'
import { mapActions, mapState, mapGetters } from "vuex";
import pageLoader from "@/mixins/pageLoader";
import { processLocation } from "@/helpers";
export default {
  props: {
    category: {
      required: false,
      type: String
    }
  },
  components: {
    CategoryItem,
    // MeetupItem,
    BrandItem,
    PriceItem
  },
  mixins: [pageLoader],
  data() {
    return {
      searchedLocation: this.$store.getters["meta/location"],
      filter: {}
    };
  },
  computed: {
    meetups() {
      return this.$store.state.meetups.items;
    },
    ...mapGetters({
      user: "auth/authUser",
      ipLocation: "meta/location"
    }),
    ...mapState({
      meetups: state => state.meetups.items,
      categories: state => state.categories.items,
      prices: state => state.prices.items,
      brands: state => state.brands.items
    })
  },
  created() {
    const filter = {};
    if (this.ipLocation) {
      filter["location"] = processLocation(this.ipLocation);
    }
    this.fetchMeetups();
    Promise.all([
      this.fetchMeetups({ filter }),
      this.fetchCategories(),
      this.fetchPrices(),
      this.fetchBrands()
    ])
      .then(() => this.pageLoader_resolveData())
      .catch(err => {
        console.error(err);
        this.pageLoader_resolveData();
      });
  },
  methods: {
    ...mapActions("meetups", ["fetchMeetups"]),
    ...mapActions("categories", ["fetchCategories"]),
    ...mapActions("prices", ["fetchPrices"]),
    ...mapActions("brands", ["fetchBrands"]),
    fetchMeetups() {
      if (this.searchedLocation) {
        this.filter["location"] = this.searchedLocation
          .toLowerCase()
          .replace(/[\s,]+/g, "")
          .trim();
      }
      if (this.category) {
        this.filter["category"] = this.category;
      }
      this.pageLoader_isDataLoaded = false;
      this.$store
        .dispatch("meetups/fetchMeetups", { filter: this.filter })
        .then(() => {
          this.pageLoader_resolveData();
        })
        .catch(err => {
          this.pageLoader_resolveData();
          console.log(err);
        });
    },
    cancelCategory() {
      this.$router.push({ name: "PageMeetupFind" });
    }
  }
};
</script>

<style scoped>
.page-find {
  margin-top: 50px;
}
.meetup-card-find {
  width: 100%;
  height: 180px;
  position: relative;
  display: block;
  border-radius: 3px;
  text-decoration: none;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.05);
  background-clip: content-box;
  background-size: cover;
  background-position: 50% 20%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  -webkit-tap-highlight-color: transparent;
}
.meetup-card-find-interest {
  position: absolute;
  bottom: 12px;
  right: 12px;
}
.meetup-card-find p {
  font-weight: bold;
}

.title {
  color: white;
}
.subtitle {
  color: white;
}
.meetup-card-find-content {
  margin: 10px;
  width: 70px;
  text-align: center;
  border-radius: 50%;
}
.meetup-card-find-date {
  margin: 10px;
  width: 70px;
  text-align: center;
  border-radius: 50%;
}
.day {
  display: block;
  font-size: 21px;
  color: white;
  font-weight: bold;
}
.month {
  display: block;
  color: #ff5050;
  font-weight: bold;
  font-size: 23px;
  margin-bottom: -5px;
}
.meetup-card-find-content-info {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 15px;
  width: 100%;
}
.text-overlay-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.lookup-prebody {
  position: relative;
}
.meetup-lookup {
  width: 960px;
  margin: 0 auto;
  background-color: #209cee;
  padding: 20px;
  color: white;
}
.meetup-lookup-wrap {
  width: 100%;
  z-index: 2;
  position: absolute;
  top: auto;
  bottom: -42px;
}
@media screen and (max-width: 600px) {
  #meetup-lookup-background {
    background-color: tan;
    position: relative;
    width: 360px;
    top: 30px;
  }
}
</style>