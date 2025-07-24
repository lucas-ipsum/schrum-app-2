<template>
  <div class="w-full">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal text-black">
          <thead>
            <tr>
              <th
                v-for="header in tableHeader"
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold uppercase tracking-wider"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableData">
              <td
                v-for="element in row.response"
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              >
                {{ convertToDisplayValues(element) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    tableData: {
      type: [Array, null],
      required: true,
    },
    tableConfig: {
      type: Array,
      required: true,
    },
    tableHeader: {
      type: Array,
      required: true,
    },
  });

  const convertToDisplayValues = (value) => {
    if (isObject(value)) {
      let tmp = "";
      Object.keys(value).forEach((key) => {
        if (value[key]) {
          tmp = tmp + key + ",";
        }
      });
      if (tmp[tmp.length - 1] == ",") {
        tmp = tmp.slice(0, -1);
      }
      return tmp;
    } else {
      return value;
    }
  };

  const isObject = (variable) => {
    return (
      typeof variable === "object" &&
      variable !== null &&
      !Array.isArray(variable)
    );
  };
</script>
