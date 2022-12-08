<template>
  <div class="column is-one-third">
    <!-- <router-link :to="'/meetups/' + meetup._id" class="card large"> -->
    <div class="card large">
      <router-link style = "text-decoration: none;" :to="{name: 'PageMeetupDetail', params: {id: meetup._id}}" class="card-meetup-link" >  
        <div class="card-image ">
          <figure class="image is-4by3">
              <!-- get here meetup image --> 
              <div class = "is-hoverable">
                <img :src="meetup.image"  alt="Image">
              </div>
          </figure> 
            <h1 style = "text-align: center" class="title is-4 no-padding is-marginless">{{meetup.title}}</h1>

        </div>
        <div class="card-content">
          <div class="level m-b-md">
            <div class="media-left">
              <div class="level-item has-text-centered">
                <div>
                  <!-- get here startDate, don't worry about formatting -->
                  <p class="title">{{meetup.createdAt | formatDate('MMM')}}</p>
                  <p class="title">{{meetup.createdAt | formatDate('D')}}</p>
                </div> 
              </div>
            </div>
            <div class="media-content">
              <!-- get here meetup title -->
                    <b><h5 style = ""  class= "">₦{{meetup.priceTag | numberWithSpaces}}</h5></b>
                <!-- get here meetup category -->
                <span class="tag"  style = "color: white; background-color: #209cee">{{meetup.brand.name | capitalize}}</span>
                <!-- <span class="tag is-success">{{meetup.priceTag | capitalize}}</span> -->

                <!-- get here meetup location -->
                <p class="subtitle is-7">{{meetup.location}}</p>
            </div>
          </div>
          <div class="content">
              <!-- get here meetup description -->
              {{meetup.description}}
              <div class="background-icon"><span class="icon-barcode"></span></div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      meetup: {
        required: true,
        type: Object
      }
    }
  }
</script>

<style scoped>
  .card-meetup-link {
    color: black;
  }

  .is-hoverable {
    transition: 5.3s;
}
    .is-hoverable :hover {
      -webkit-box-shadow: 2px 4px 15px -2px rgb(19, 18, 18);
      -moz-box-shadow: 2px 4px 15px -2px rgb(15, 15, 15);
      box-shadow: 2px 4px 15px -2px rgb(15, 15, 15);
    }
</style>