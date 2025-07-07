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
            <input type="radio" id="car" name="arrival" value="car" />
            <label class="ml-2" for="car"
              >Eigenes Auto (Nur als Fahrer*in angeben, wir wollen wissen wie
              viele Autos ca. da sind)</label
            >
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
          <input type="checkbox" id="saturday" name="saturday" value="saturday" />
          <label class="ml-2" for="saturday">Samstag</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="sunday"
            name="sunday"
            value="sunday"
          />
          <label class="ml-2" for="sunday">Sonntag</label>
        </div>
        <div>
          <input type="checkbox" id="no_breakfast" name="no_breakfast" value="no_breakfast" />
          <label class="ml-2" for="no_breakfast">Nope</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
