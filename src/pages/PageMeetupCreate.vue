<template>
  <div class="meetup-create-page">
    <AppHero />
    <section class="section">
      <div class="container">
        <MeetupCreateWizard @meetupConfirmed="createMeetup"/>
      </div>
    </section>
  </div>
</template>

<script>
  import MeetupCreateWizard from '@/components/MeetupCreate/MeetupCreateWizard'
  export default {
    components: {
      MeetupCreateWizard
    },
    computed: {
      categories () {
        return this.$store.state.categories.items
      },
      prices(){
        return this.$store.state.prices.items
      },
      brands(){
        return this.$store.state.brands.items
      }
    },
    created () {
      if (this.categories.length === 0) {
        this.$store.dispatch('categories/fetchCategories')
      }
      if(this.prices.length === 0){
        this.$store.dispatch('prices/fetchPrices')
      }
      if(this.brands.length === 0){
        this.$store.dispatch('brands/fetchBrands')
      }
    },
    methods: {
      createMeetup (meetupToCreate) {
        this.$store.dispatch('meetups/createMeetup', meetupToCreate)
          .then(createdMeetup => {
            this.$router.push(`/meetups/${createdMeetup._id}`)
          })
          .catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped>
  .meetup-create-page {
    min-height: 100vh;
  }
</style>