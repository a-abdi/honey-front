<template>
    <div v-if="productData?.data" class="w-full">
       <div class="sm:flex text-xs sm:text-sm mt-2 ">
            <div class="w-full sm:w-2/3 lg:p-6 md:px-4 sm:px-1 sm:py-6 p-0.5">
                <div class="border border-gray-200 rounded-md px-4 shadow">
                    <div class=" w-full text-center p-2 text-lg my-2">
                        {{ productData.data.name }}
                    </div>
                    <div class="w-full flex flex-row-reverse my-2">
                        <div class="p-1 text-gray-600">
                            <label for="price">:قیمت</label>
                        </div>
                        <Currency id="price" :money="productData.data.price" class="text-red-600 p-1" />
                    </div>
                    <div class="w-full flex flex-row-reverse my-2">
                        <div class="p-1 text-gray-600">
                            <label for="discount">:تخفیف</label>
                        </div>
                        <Currency id="discount" :money="productData.data.discount" class="text-red-600 p-1" />
                    </div>
                    <div class="w-full flex flex-row-reverse my-2">
                        <div class="p-1 text-gray-600">
                            <label for="quantity">:تعداد</label>
                        </div>
                        <div id="quantity" class="p-1 text-red-600">
                            <Currency :money="productData.data.quantity"/>
                        </div>
                    </div>
                    <div class="w-full flex flex-row-reverse my-2">
                        <div class="p-1 text-gray-600">
                            <label for="category">:دسته</label>
                        </div>
                        <div v-if="typeof productData.data.category == 'object'" id="category" class="text-red-600 p-1">
                            {{ productData.data.category.name }}
                        </div>
                    </div>
                    <div class="flex flex-row-reverse w-full my-2">
                        <p class="text-gray-600 p-1 text-right leading-loose tracking-wide">
                            {{ productData.data.description }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="w-full sm:w-1/3 lg:p-6 md:px-4 sm:px-1 sm:py-6 p-0.5">
                <img :src="productData.data.imageSrc" alt="" class="object-cover w-auto h-auto">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Currency from '@/components/Currency.vue';
import { useProductStore } from '@/stores/product';
import { getProductConfig } from '@/common/config/axiox.config';
import { storeToRefs } from 'pinia';

    const route = useRoute();
    const productId = route.params.productId as string;
    const productStore = useProductStore();
    const config = getProductConfig(productId);
    productStore.getProduct(config);
    const { productData } = storeToRefs(productStore);
</script>