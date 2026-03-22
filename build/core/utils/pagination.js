import { StringSelectMenuInteraction, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, TextDisplayBuilder, MessageFlags } from 'discord.js';
import { manager, Utils } from '../../index.js';
export class Pagination {
    type = 'select_menu';
    placeholderText;
    itemsPerPage = 25;
    time = 100000;
    ephemeral = true;
    format;
    filters = [];
    context = {};
    variables = [];
    defaultItems;
    filteredItems;
    currentItem = 0;
    currentFilters = [];
    currentPage = 0;
    constructor(items) {
        this.filteredItems = items;
        this.defaultItems = items;
        this.placeholderText = manager.lang.getString("pagination.placeholder");
        return this;
    }
    /**
      * Define the format of the message components
      * @param format A function that takes the current items and returns the message components
      */
    setFormat(format) {
        this.format = format;
        return this;
    }
    /**
      * Set whether the message is ephemeral
      */
    setEphemeral(ephemeral) {
        this.ephemeral = ephemeral;
        return this;
    }
    /**
      * Set the type of pagination
      */
    setType(type) {
        this.type = type;
        return this;
    }
    /**
      * Set the items per page. Default is 25
      */
    setItemsPerPage(itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
        return this;
    }
    /**
      * Set the variables to be used in the message
      */
    setVariables(variables) {
        this.variables = variables;
        return this;
    }
    /**
      * Set the categories to be used in the select menu
      */
    setFilters(filters) {
        this.filters = filters;
        return this;
    }
    /**
      * Set the context to be used in the message
      */
    setContext(context) {
        this.context = context;
        return this;
    }
    /**
      * Set the time for the collector to listen
      */
    setTime(interval) {
        this.time = interval;
        return this;
    }
    /**
      * Set the placeholder text for the select menu
      */
    setPlaceholderText(placeholderText) {
        this.placeholderText = placeholderText;
        return this;
    }
    /**
     * Send the pagination message
     */
    async reply(interaction) {
        const message = await interaction.reply(await this.buildMessage('initial'));
        this.createCollector(message);
        return message;
    }
    async buildMessage(type) {
        const message = {
            flags: [],
            components: []
        };
        if (this.ephemeral) {
            message.flags |= MessageFlags.Ephemeral;
        }
        message.flags |= MessageFlags.IsComponentsV2;
        const items = this.type === 'select_menu' ? [this.filteredItems[this.currentItem]] : this.getCurrentItems();
        if (this.filteredItems.length) {
            message.components.push(...await this.format(items, this.getVariables(), this.getContext()));
        }
        else {
            message.components.push(new TextDisplayBuilder().setContent(manager.lang.getString("pagination.no-items")));
        }
        if (type !== 'end') {
            message.components.push(...await this.getInteractiveComponents());
        }
        return message;
    }
    createCollector(message) {
        const filter = (interaction) => ['pagination_items', 'pagination_previous', 'pagination_next', 'pagination_filters'].includes(interaction.customId);
        const collector = message.createMessageComponentCollector({ filter, time: this.time });
        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'pagination_previous')
                this.prevPage();
            if (interaction.customId === 'pagination_next')
                this.nextPage();
            if (interaction instanceof StringSelectMenuInteraction) {
                if (interaction.values[0]?.startsWith("item_")) {
                    this.currentItem = parseInt(interaction.values[0].split("_", 2)[1]);
                }
                else {
                    this.currentFilters = [];
                    for (const filter of interaction.values) {
                        const filterId = filter.substring(7);
                        this.currentFilters.push(filterId);
                    }
                    this.filteredItems = this.currentFilters.length
                        ? this.defaultItems.filter(item => item.tags?.some(tag => this.currentFilters.includes(tag)))
                        : this.defaultItems;
                    this.currentPage = 0;
                    this.currentItem = 0;
                }
            }
            ;
            interaction.update(await this.buildMessage('update'));
        });
        collector.on('end', async () => {
            try {
                message.edit(await this.buildMessage('end'));
            }
            catch (e) { /* Ignore */ }
        });
    }
    getContext() {
        let context = this.context;
        if (this.type === 'select_menu') {
            const item = this.filteredItems[this.currentItem];
            if (item) {
                context = { ...context, ...item.context };
            }
        }
        return context;
    }
    async getInteractiveComponents() {
        if (!this.filteredItems.length)
            return [];
        const components = [];
        const paginationRow = new ActionRowBuilder();
        if (this.currentPage > 0) {
            paginationRow.addComponents(new ButtonBuilder()
                .setCustomId('pagination_previous')
                .setLabel(manager.lang.getString("pagination.previous-page"))
                .setEmoji('◀️')
                .setStyle(ButtonStyle.Secondary));
        }
        if (this.currentPage < this.getTotalPages() - 1) {
            paginationRow.addComponents(new ButtonBuilder()
                .setCustomId('pagination_next')
                .setLabel(manager.lang.getString("pagination.next-page"))
                .setEmoji('▶️')
                .setStyle(ButtonStyle.Secondary));
        }
        if (paginationRow.components.length) {
            components.push(paginationRow);
        }
        if (this.type === 'select_menu') {
            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId(`pagination_items`)
                .setPlaceholder(await Utils.applyVariables(this.placeholderText, this.getVariables()));
            for (const item of this.getCurrentItems()) {
                const index = this.filteredItems.indexOf(item);
                selectMenu.addOptions({
                    label: item.label || `Item ${index + 1}`,
                    value: `item_${index}`,
                    description: item.description,
                    emoji: item.emoji,
                    default: this.currentItem === index
                });
            }
            if (selectMenu.options.length) {
                components.push(new ActionRowBuilder().addComponents(selectMenu));
            }
        }
        if (this.filters.length) {
            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId(`pagination_filters`)
                .setPlaceholder(this.placeholderText)
                .setMaxValues(this.filters.length);
            for (const filter of this.filters) {
                const isSelected = this.currentFilters.includes(filter.id);
                selectMenu.addOptions({
                    label: filter.name,
                    value: `filter_${filter.id}`,
                    description: filter.description,
                    emoji: filter.emoji,
                    default: isSelected
                });
            }
            components.push(new ActionRowBuilder().addComponents(selectMenu));
        }
        return components;
    }
    getVariables() {
        const variables = [...this.variables,
            { name: "pagination_current_page", value: this.currentPage + 1 },
            { name: "pagination_total_pages", value: this.getTotalPages() }
        ];
        if (this.type === 'select_menu') {
            const item = this.filteredItems[this.currentItem];
            if (item && item.variables) {
                variables.push(...item.variables);
            }
        }
        return variables;
    }
    getCurrentItems() {
        const startIndex = this.currentPage * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredItems.length);
        return this.filteredItems.slice(startIndex, endIndex);
    }
    getTotalPages() {
        return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    }
    nextPage() {
        if (this.currentPage < this.getTotalPages() - 1) {
            this.currentPage++;
        }
    }
    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
        }
    }
}
