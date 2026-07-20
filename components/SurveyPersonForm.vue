<template>
  <div class="flex flex-col gap-4">
    <!-- Name (nur für Begleitpersonen) -->
    <div v-if="showName">
      <p class="font-3xl font-extrabold">Name</p>
      <div class="ml-2">
        <input
          class="bg-white rounded p-1 w-[250px] text-black"
          type="text"
          :id="`${uid}-name`"
          :name="`${uid}-name`"
          v-model="person.name"
        />
      </div>
    </div>

    <!-- Question 1 -->
    <div class="">
      <p class="font-3xl font-extrabold">Bist du dabei?</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <div>
          <input
            type="checkbox"
            :id="`${uid}-friday`"
            :name="`${uid}-friday`"
            v-model="person.attending.friday"
          />
          <label class="ml-2" :for="`${uid}-friday`">Freitag</label>
        </div>
        <div>
          <input
            type="checkbox"
            :id="`${uid}-attending-saturday`"
            :name="`${uid}-attending-saturday`"
            v-model="person.attending.saturday"
          />
          <label class="ml-2" :for="`${uid}-attending-saturday`">Samstag</label>
        </div>
        <div>
          <input
            type="checkbox"
            :id="`${uid}-tent`"
            :name="`${uid}-tent`"
            v-model="person.attending.tent"
          />
          <label class="ml-2" :for="`${uid}-tent`"
            >Mit Zelt (hier nur eine Person pro Zelt angeben, wollen ungefähr
            wissen für wie viele Zelte wir Platz brauchen)</label
          >
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
              :id="`${uid}-car_driver`"
              :name="`${uid}-arrival`"
              value="car_driver"
              v-model="person.arrival"
            />
            <label class="ml-2" :for="`${uid}-car_driver`">Auto Fahrer*in</label>
          </div>
          <div>
            <input
              type="radio"
              :id="`${uid}-car_passenger`"
              :name="`${uid}-arrival`"
              value="car_passenger"
              v-model="person.arrival"
            />
            <label class="ml-2" :for="`${uid}-car_passenger`"
              >Auto Beifahrer*in</label
            >
          </div>
          <div>
            <input
              type="radio"
              :id="`${uid}-train`"
              :name="`${uid}-arrival`"
              value="train"
              v-model="person.arrival"
            />
            <label class="ml-2" :for="`${uid}-train`">Zug</label>
          </div>
          <div>
            <input
              type="radio"
              :id="`${uid}-other`"
              :name="`${uid}-arrival`"
              value="other"
              v-model="person.arrival"
            />
            <label class="ml-2" :for="`${uid}-other`">Andere</label>
          </div>
        </fieldset>
      </div>
    </div>

    <!-- Question Shuttle time -->
    <div v-if="person.arrival == 'train'" class="">
      <p class="font-3xl font-extrabold">Abholzeit am Bahnhof:</p>
      <div class="flex flex-col gap-2 font-bold ml-2">
        <fieldset>
          <div class="flex gap-2">
            <select
              :name="`${uid}-shuttle_day`"
              :id="`${uid}-shuttle_day`"
              v-model="person.shuttle.day"
            >
              <option value="friday">Freitag</option>
              <option value="saturday">Samstag</option>
            </select>
            <select
              :name="`${uid}-shuttle_time`"
              :id="`${uid}-shuttle_time`"
              v-model="person.shuttle.hour"
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
            :id="`${uid}-breakfast-saturday`"
            :name="`${uid}-breakfast-saturday`"
            v-model="person.breakfast.saturday"
          />
          <label class="ml-2" :for="`${uid}-breakfast-saturday`">Samstag</label>
        </div>
        <div>
          <input
            type="checkbox"
            :id="`${uid}-breakfast-sunday`"
            :name="`${uid}-breakfast-sunday`"
            v-model="person.breakfast.sunday"
          />
          <label class="ml-2" :for="`${uid}-breakfast-sunday`">Sonntag</label>
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
            :id="`${uid}-artist`"
            :name="`${uid}-artist`"
            v-model="person.artist.isArtist"
          />
          <label class="ml-2" :for="`${uid}-artist`">Ja</label>
        </div>
        <div v-if="person.artist.isArtist" class="flex flex-col">
          <label class="ml-2" :for="`${uid}-band_name`">Band / Name:</label>
          <input
            class="bg-white rounded p-1 w-[250px] text-black"
            type="text"
            :id="`${uid}-band_name`"
            :name="`${uid}-band_name`"
            v-model="person.artist.band_name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    // The person response object (mutated in place via v-model).
    person: {
      type: Object,
      required: true,
    },
    // Show the name field (used for companions, not for the logged in user).
    showName: {
      type: Boolean,
      default: false,
    },
    shuttleTimeOptions: {
      type: Array,
      required: true,
    },
  });

  // Unique prefix so ids/names don't collide when multiple forms are rendered.
  const uid = useId();
</script>
