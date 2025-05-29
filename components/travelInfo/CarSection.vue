<template>
        <div class="flex flex-col gap-5">
            <div class="flex gap-6 justify-center">
                <button @click="displayMap = true" class="outline outline-2 p-4 flex font-semibold w-fit">
                    <span>
                        Karte anzeigen
                    </span>
                 </button>
                <a href="" target="_blank" rel="noopener noreferrer" class="outline outline-2 p-4 flex font-semibold w-fit">             
                     Google Maps
                </a>
            </div>

            <div class="flex flex-col">
                <span class="font-semibold text-xl w-fit px-1 bg-yellow-800">
                    Info! 
                </span>
                <ul class="text-lg mw-[400px]">
                    <li>
                        Placeholder
                    </li>
                </ul>
            </div>

            <div class="flex flex-col">
                <span class="font-semibold text-xl w-fit px-1 bg-yellow-800">
                    Anfahrt
                </span>
                <ul class="text-lg mw-[400px]">
                    <li>
                        Placeholder
                    </li>
                </ul>
            </div>
        </div>
        <!-- <PopupImage @displayPopupChange="(res) => (displayMap = res)" :displayPopup="displayMap" imgSrc="/images/map_travel_info.jpg"/> -->
</template>

<script setup>
const displayMap = ref(false);
</script>

<style scoped>
ul {
  list-style-type: circle; /* Change bullet style */
  /* Other list styles */
}

ul li {
margin-left: 22px;
  margin-bottom: 8px; /* Example: Add margin between list items */
}
</style>