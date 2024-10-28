<template>
    <div class="container mx-auto p-4">
        <select v-model="selectedLocale" class="mb-4">
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
        </select>

        <div>
            <CategoryNode
                v-for="category in categories"
                :key="category.id"
                :category="category"
                :locale="selectedLocale"
                :breadcrumbs="[]"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CategoryNode from '~/components/CategoryNode.vue';
import type { Category } from '~/types/categoryType.ts';

const categories = ref<Category[]>([]);
const selectedLocale = ref<string>('ru');

const loadCategories = async () => {
    try {
        const response = await fetch('/task_json.txt');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        categories.value = data as Category[];
    } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
    }
};

onMounted(loadCategories);
</script>
