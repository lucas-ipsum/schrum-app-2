<template>
  <div class="flex flex-col gap-4 mx-3 sm:mx-[20%] sm:outline-2 sm:p-5">
    <!-- Question 1 -->
    <div class="">
      <p class="font-3xl font-extrabold">Bist du dabei?</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <div>
          <input type="checkbox" id="friday" name="friday" value="friday" />
          <label class="ml-2" for="friday">Freitag</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="saturday"
            name="saturday"
            value="saturday"
          />
          <label class="ml-2" for="saturday">Samstag</label>
        </div>
        <div>
          <input type="checkbox" id="tent" name="tent" value="tent" />
          <label class="ml-2" for="tent">Mit Zelt</label>
        </div>
      </div>
    </div>

    <!-- Question 2 -->
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
            />
            <label class="ml-2" for="car_driver">Auto Fahrer*in</label>
          </div>
          <div>
            <input
              type="radio"
              id="car_passenger"
              name="arrival"
              value="car_passenger"
            />
            <label class="ml-2" for="car_passenger">Auto Beifahrer*in</label>
          </div>
          <div>
            <input type="radio" id="train" name="arrival" value="train" />
            <label class="ml-2" for="train">Zug</label>
          </div>
          <div>
            <input type="radio" id="other" name="arrival" value="other" />
            <label class="ml-2" for="other">Andere</label>
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
          />
          <label class="ml-2" for="saturday">Samstag</label>
        </div>
        <div>
          <input type="checkbox" id="sunday" name="sunday" value="sunday" />
          <label class="ml-2" for="sunday">Sonntag</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="no_breakfast"
            name="no_breakfast"
            value="no_breakfast"
          />
          <label class="ml-2" for="no_breakfast">Nope</label>
        </div>
      </div>
    </div>

    <!-- Question 2 -->
    <div class="">
      <p class="font-3xl font-extrabold">Als Künstler*in dabei?</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <fieldset>
          <div>
            <input type="radio" id="yes" name="artist" value="yes" />
            <label class="ml-2" for="yes">Ja</label>
          </div>

          <div>
            <input type="radio" id="no" name="artist" value="no" />
            <label class="ml-2" for="no">Nein</label>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script setup>
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
    breakfast: {
      friday: false,
      saturday: false,
      no_breakfast: false,
    },
  });
</script>
