<template>
    <div class="ml-4">
        <div
            @click="toggleChildren"
            class="flex items-center cursor-pointer hover:bg-gray-200"
        >
            <button v-if="hasChildren" class="mr-2">
                <span>{{ isOpen ? '-' : '+' }}</span>
            </button>
            <span class="font-semibold">
                {{ categoryName }}
            </span>
        </div>
        <a :href="categoryLink" target="_blank" class="hover:text-blue-600">
            Перейти
        </a>
        <div class="text-sm text-gray-500">{{ fullBreadcrumbs }}</div>
        <div v-if="isOpen && hasChildren" class="pl-4">
            <CategoryNode
                v-for="child in category.childs"
                :key="child.id"
                :category="child"
                :locale="locale"
                :breadcrumbs="fullBreadcrumbsArray"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { defineProps } from 'vue';
import type { Category } from '~/types/categoryType.ts';

const props = defineProps<{
    category: Category;
    locale: string;
    breadcrumbs: string[];
}>();

const isOpen = ref(false);
const hasChildren = computed(
    () => !!props.category.childs && props.category.childs.length > 0
);

const categoryName = computed(() => {
    return (
        props.category.locale[props.locale]?.cg_name ||
        props.category.locale['ru']?.cg_name ||
        'Неизвестная категория'
    );
});

const categoryLink = computed(() => {
    return (
        props.category.locale[props.locale]?.link ||
        props.category.locale['ru']?.link ||
        '#'
    );
});

const fullBreadcrumbs = computed(() => {
    return [...props.breadcrumbs, categoryName.value].join(' -> ');
});

const fullBreadcrumbsArray = computed(() => [
    ...props.breadcrumbs,
    categoryName.value,
]);

const toggleChildren = () => {
    isOpen.value = !isOpen.value;
};
</script>
