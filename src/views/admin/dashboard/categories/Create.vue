<template>
    <form @submit.prevent="createCategory" >
        <div class="px-1 sm:p-4 my-6 mx-auto w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 border border-gray-200 rounded-md">
            <div class="w-full my-4">
                <input v-model="category.name" id="name" type="text" placeholder="name" class="form-input">
            </div>
            <div class="w-full my-4">
                <textarea v-model="category.description" placeholder="description" class="p-2 text-gray-600 resize-y border rounded-md w-full h-16 sm:h-24 md:h-32 xl:h-40 focus:outline-none focus:ring-2 focus:ring-blue-200"></textarea>
            </div>
            <div class="w-full my-4">
                <button :disabled="form.loading" :class="{'cursor-wait': form.loading}" type="submit" class="btn-blue">
                    Create Category
                </button>
            </div> 
            <Message class="absolute bottom-4 right-4 bg-gray-300" 
                :message="form.message"
                :showMessage="showMessage"
                :typeMessage="form.typeMessage"
                @fadeMessage="showMessage = false" 
            />
        </div>
    </form>
</template>

<script setup lang="ts">
import { createCategoryConfig } from '@/common/config/axiox.config';
import { reactive, ref } from 'vue';
import { useCategoryStore } from '@/stores/category';
import type { Page, NewCategory } from '@/common/typings';
import { TypeMessage } from '@/common/typings';
import { storeToRefs } from 'pinia';
import Message from '@/components/message/Message.vue';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';

        const form = reactive<Page>({
            loading: false,
            message: '',
            typeMessage: TypeMessage.Success
        });
        const showMessage = ref(false);
        const categoryStore = useCategoryStore();
        const category = reactive<NewCategory>({
            name: "",
            description: "",
        });
        
        const createCategory = async () => {
            form.loading = true;
            form.errorMessage = null;
            form.successMessage = null;
            
            try {
                const config = createCategoryConfig(category);
                showMessage.value = true;
                await categoryStore.createCategory(config);
                const { categoryData } = storeToRefs(categoryStore);
                form.typeMessage = TypeMessage.Success;
                form.message = categoryData.value?.message;
            } catch (error: any) {
                form.typeMessage = TypeMessage.Danger;
                if (axios.isAxiosError(error)) {
                form.message = getAxiosErrorMessage(error);
                } else {
                    console.log(error);
                }
            }
            form.loading = false;
        };

</script>