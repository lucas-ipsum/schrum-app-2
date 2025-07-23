<template>
  <div class="flex flex-col gap-4 mx-3 sm:mx-[20%] sm:outline-2 sm:p-5">
    <!-- Question 1 -->
    <div class="">
      <p class="font-3xl font-extrabold">Bist du dabei?</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <div>
          <input
            type="checkbox"
            id="friday"
            name="friday"
            value="friday"
            v-model="surveyResponse.attending.friday"
          />
          <label class="ml-2" for="friday">Freitag</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="saturday"
            name="saturday"
            value="saturday"
            v-model="surveyResponse.attending.saturday"
          />
          <label class="ml-2" for="saturday">Samstag</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="tent"
            name="tent"
            value="tent"
            v-model="surveyResponse.attending.tent"
          />
          <label class="ml-2" for="tent">Mit Zelt</label>
        </div>
      </div>
    </div>

    <!-- Question Arrival -->
    <div class="">
      <p class="font-3xl font-extrabold">Anreise</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <fieldset>
          <div>
            <input
              type="radio"
              id="car_driver"
              name="arrival"
              value="car_driver"
              v-model="surveyResponse.arrival.car_driver"
            />
            <label class="ml-2" for="car_driver">Auto Fahrer*in</label>
          </div>
          <div>
            <input
              type="radio"
              id="car_passenger"
              name="arrival"
              value="car_passenger"
              v-model="surveyResponse.arrival.car_passenger"
            />
            <label class="ml-2" for="car_passenger">Auto Beifahrer*in</label>
          </div>
          <div>
            <input
              type="radio"
              id="train"
              name="arrival"
              value="train"
              v-model="surveyResponse.arrival.train"
            />
            <label class="ml-2" for="train">Zug</label>
          </div>
          <div>
            <input
              type="radio"
              id="other"
              name="arrival"
              value="other"
              v-model="surveyResponse.arrival.other"
            />
            <label class="ml-2" for="other">Andere</label>
          </div>
        </fieldset>
      </div>
    </div>

    <!-- Question Shuttle time -->
    <div v-if="surveyResponse.arrival.train" class="">
      <p class="font-3xl font-extrabold">Abholzeit am Bahnhof:</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <fieldset>
          <div class="flex gap-2">
            <select
              name="shuttle_day"
              id="shuttle_day"
              v-model="surveyResponse.shuttle.day"
            >
              <option value="friday">Freitag</option>
              <option value="saturday">Samstag</option>
            </select>
            <select
              name="shuttle_time"
              id="shuttle_time"
              v-model="surveyResponse.shuttle.hour"
            >
              <option v-for="hour in shuttleTimeOptions" :value="hour">
                {{ hour }} Uhr
              </option>
            </select>
          </div>
        </fieldset>
      </div>
    </div>

    <!-- Question 3 -->
    <div class="">
      <p class="font-3xl font-extrabold">Bock auf Frühstück?</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <div>
          <input
            type="checkbox"
            id="saturday"
            name="saturday"
            value="saturday"
            v-model="surveyResponse.breakfast.saturday"
          />
          <label class="ml-2" for="saturday">Samstag</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="sunday"
            name="sunday"
            value="sunday"
            v-model="surveyResponse.breakfast.sunday"
          />
          <label class="ml-2" for="sunday">Sonntag</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="no_breakfast"
            name="no_breakfast"
            value="no_breakfast"
            v-model="surveyResponse.breakfast.no_breakfast"
          />
          <label class="ml-2" for="no_breakfast">Nope</label>
        </div>
      </div>
    </div>

    <!-- Question 4 -->
    <div class="">
      <p class="font-3xl font-extrabold">Als Künstler*in dabei?</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <div>
          <input
            type="checkbox"
            id="yes"
            name="yes"
            value="yes"
            v-model="surveyResponse.artist"
          />
          <label class="ml-2" for="yes">Ja</label>
        </div>
      </div>
    </div>
    <shared-submit-button text="Absenden" @submit="submitData"/> 
  </div>
  {{ surveyResponse }}
</template>

<script setup>
  // ## refs and input data ##
  const shuttleTimeOptions = ref([
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ]);
  const surveyResponse = ref({
    attending: {
      friday: false,
      saturday: false,
      tent: false,
    },
    arrival: {
      car_driver: false,
      car_passenger: false,
      train: false,
      other: false,
    },
    shuttle: {
      day: null,
      hour: null,
    },
    breakfast: {
      friday: false,
      saturday: false,
      no_breakfast: false,
    },
    artist: false,
  });

  // data checks
  const checkData = () => {
    if (surveyResponse.value.arrival.train) {
      surveyResponse.value.shuttle.day = null;
      surveyResponse.value.shuttle.hour = null;
    }
  };

  // submit data 
  const submitData = () => {
    checkData();

  }
</script>
