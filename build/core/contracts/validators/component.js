var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { IsString, IsArray, IsBoolean, IsOptional, IsDefined, ValidateNested, IsIn, IsInt, Validate, IsNumber, MaxLength } from 'class-validator';
import { ConditionValidator } from '../../../index.js';
import { IsBooleanOrString, IsTextInputStyle } from '../decorators/validator.js';
function ActionRowComponentType() {
    return Type(() => ComponentValidator, {
        discriminator: {
            property: 'type',
            subTypes: [
                { value: ButtonValidator, name: 'button' },
                { value: SelectMenuValidator, name: 'select-menu' },
                { value: RepeatActionRowValidator, name: 'repeat' },
            ],
        },
        keepDiscriminatorProperty: true
    });
}
export function TypeTopMessageComponentValidator() {
    return Type(() => ComponentValidator, {
        discriminator: {
            property: 'type',
            subTypes: [
                { value: TextDisplayValidator, name: 'text-display' },
                { value: ActionRowValidator, name: 'action-row' },
                { value: SeparatorValidator, name: 'separator' },
                { value: SectionValidator, name: 'section' },
                { value: MediaGalleryValidator, name: 'media-gallery' },
                { value: FileValidator, name: 'file' },
                { value: ContainerValidator, name: 'container' },
                { value: RepeatComponentValidator, name: 'repeat' }
            ],
        },
        keepDiscriminatorProperty: true
    });
}
class WithCondition {
    conditions;
}
__decorate([
    IsOptional(),
    ValidateNested({ each: true }),
    IsArray(),
    Type(() => ConditionValidator),
    __metadata("design:type", Array)
], WithCondition.prototype, "conditions", void 0);
export class ComponentValidator extends WithCondition {
    type;
}
__decorate([
    IsDefined(),
    IsString(),
    IsIn(['button', 'select-menu', 'text-display', 'action-row', 'separator', 'section', 'media-gallery', 'file', 'container', 'repeat', 'thumbnail', 'text-input', 'modal', 'label', 'file-upload']),
    __metadata("design:type", String)
], ComponentValidator.prototype, "type", void 0);
class TextInputValidator extends ComponentValidator {
    'custom-id';
    placeholder;
    required;
    'max-length';
    'min-length';
    value;
    style;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], TextInputValidator.prototype, "custom-id", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], TextInputValidator.prototype, "placeholder", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], TextInputValidator.prototype, "required", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], TextInputValidator.prototype, "max-length", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], TextInputValidator.prototype, "min-length", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TextInputValidator.prototype, "value", void 0);
__decorate([
    IsOptional(),
    IsString(),
    Validate(IsTextInputStyle),
    __metadata("design:type", String)
], TextInputValidator.prototype, "style", void 0);
class FileUploadValidator extends ComponentValidator {
    'custom-id';
    required;
    'max-length';
    'min-length';
}
__decorate([
    IsDefined(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], FileUploadValidator.prototype, "custom-id", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], FileUploadValidator.prototype, "required", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], FileUploadValidator.prototype, "max-length", void 0);
__decorate([
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], FileUploadValidator.prototype, "min-length", void 0);
export class ButtonValidator extends ComponentValidator {
    style;
    'custom-id';
    disabled;
    label;
    emoji;
    url;
}
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ButtonValidator.prototype, "style", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ButtonValidator.prototype, "custom-id", void 0);
__decorate([
    IsOptional(),
    Validate(IsBooleanOrString),
    __metadata("design:type", Object)
], ButtonValidator.prototype, "disabled", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ButtonValidator.prototype, "label", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ButtonValidator.prototype, "emoji", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ButtonValidator.prototype, "url", void 0);
class OptionsValidator extends WithCondition {
    label;
    value;
    emoji;
    default;
    description;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], OptionsValidator.prototype, "label", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], OptionsValidator.prototype, "value", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OptionsValidator.prototype, "emoji", void 0);
__decorate([
    IsOptional(),
    Validate(IsBooleanOrString),
    __metadata("design:type", Object)
], OptionsValidator.prototype, "default", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OptionsValidator.prototype, "description", void 0);
export class SelectMenuValidator extends ComponentValidator {
    'custom-id';
    placeholder;
    'min-values';
    'max-values';
    options;
    'data-source';
    template;
}
__decorate([
    IsDefined(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], SelectMenuValidator.prototype, "custom-id", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], SelectMenuValidator.prototype, "placeholder", void 0);
__decorate([
    IsOptional(),
    IsInt({ each: true }),
    __metadata("design:type", Object)
], SelectMenuValidator.prototype, "min-values", void 0);
__decorate([
    IsOptional(),
    IsInt({ each: true }),
    __metadata("design:type", Object)
], SelectMenuValidator.prototype, "max-values", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => OptionsValidator),
    __metadata("design:type", Array)
], SelectMenuValidator.prototype, "options", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], SelectMenuValidator.prototype, "data-source", void 0);
__decorate([
    IsOptional(),
    ValidateNested(),
    Type(() => OptionsValidator),
    __metadata("design:type", OptionsValidator)
], SelectMenuValidator.prototype, "template", void 0);
export class SeparatorValidator extends ComponentValidator {
    divider;
    spacing;
}
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], SeparatorValidator.prototype, "divider", void 0);
__decorate([
    IsOptional(),
    IsIn([1, 2]),
    __metadata("design:type", Number)
], SeparatorValidator.prototype, "spacing", void 0);
class TextDisplayValidator extends ComponentValidator {
    content;
}
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], TextDisplayValidator.prototype, "content", void 0);
class LabelValidator extends ComponentValidator {
    label;
    description;
    component;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], LabelValidator.prototype, "label", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], LabelValidator.prototype, "description", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => ComponentValidator, {
        discriminator: {
            property: 'type',
            subTypes: [
                { value: TextInputValidator, name: 'text-input' },
                { value: SelectMenuValidator, name: 'select-menu' },
                { value: FileUploadValidator, name: 'file-upload' }
            ],
        },
        keepDiscriminatorProperty: true
    }),
    __metadata("design:type", Object)
], LabelValidator.prototype, "component", void 0);
export class ModalValidator {
    title;
    components;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], ModalValidator.prototype, "title", void 0);
__decorate([
    IsDefined(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ComponentValidator, {
        discriminator: {
            property: 'type',
            subTypes: [
                { value: LabelValidator, name: 'label' },
                { value: TextDisplayValidator, name: 'text-display' }
            ],
        },
        keepDiscriminatorProperty: true
    }),
    __metadata("design:type", Array)
], ModalValidator.prototype, "components", void 0);
class ThumbnailValidator extends ComponentValidator {
    url;
    description;
    spoiler;
}
__decorate([
    IsDefined(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ThumbnailValidator.prototype, "url", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ThumbnailValidator.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ThumbnailValidator.prototype, "spoiler", void 0);
class RepeatActionRowValidator extends ComponentValidator {
    'data-source';
    template;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], RepeatActionRowValidator.prototype, "data-source", void 0);
__decorate([
    IsDefined(),
    ValidateNested({ each: true }),
    IsArray(),
    Type(() => ComponentValidator, {
        discriminator: {
            property: 'type',
            subTypes: [
                { value: ButtonValidator, name: 'button' },
                { value: SelectMenuValidator, name: 'select-menu' }
            ],
        },
        keepDiscriminatorProperty: true
    }),
    __metadata("design:type", Array)
], RepeatActionRowValidator.prototype, "template", void 0);
class ActionRowValidator extends ComponentValidator {
    components;
}
__decorate([
    IsDefined(),
    ValidateNested({ each: true }),
    IsArray(),
    ActionRowComponentType(),
    __metadata("design:type", Array)
], ActionRowValidator.prototype, "components", void 0);
class MediaGalleryItemValidator extends WithCondition {
    url;
    description;
    spoiler;
}
__decorate([
    IsDefined(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MediaGalleryItemValidator.prototype, "url", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MediaGalleryItemValidator.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], MediaGalleryItemValidator.prototype, "spoiler", void 0);
class MediaGalleryValidator extends ComponentValidator {
    items;
}
__decorate([
    IsDefined(),
    ValidateNested({ each: true }),
    IsArray(),
    Type(() => MediaGalleryItemValidator),
    __metadata("design:type", Array)
], MediaGalleryValidator.prototype, "items", void 0);
class FileValidator extends ComponentValidator {
    url;
    spoiler;
}
__decorate([
    IsDefined(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], FileValidator.prototype, "url", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], FileValidator.prototype, "spoiler", void 0);
class RepeatSectionValidator extends ComponentValidator {
    'data-source';
    template;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], RepeatSectionValidator.prototype, "data-source", void 0);
__decorate([
    IsDefined(),
    ValidateNested({ each: true }),
    IsArray(),
    Type(() => TextDisplayValidator),
    __metadata("design:type", Array)
], RepeatSectionValidator.prototype, "template", void 0);
class SectionValidator extends ComponentValidator {
    components;
    accessory;
}
__decorate([
    IsDefined(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ComponentValidator, {
        discriminator: {
            property: 'type',
            subTypes: [
                { value: TextDisplayValidator, name: 'text-display' },
                { value: RepeatSectionValidator, name: 'repeat' }
            ],
        },
        keepDiscriminatorProperty: true
    }),
    __metadata("design:type", Array)
], SectionValidator.prototype, "components", void 0);
__decorate([
    IsDefined(),
    ValidateNested(),
    Type(() => ComponentValidator, {
        discriminator: {
            property: 'type',
            subTypes: [
                { value: ThumbnailValidator, name: 'thumbnail' },
                { value: ButtonValidator, name: 'button' }
            ],
        },
        keepDiscriminatorProperty: true
    }),
    __metadata("design:type", Object)
], SectionValidator.prototype, "accessory", void 0);
class RepeatContainerValidator extends ComponentValidator {
    'data-source';
    template;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], RepeatContainerValidator.prototype, "data-source", void 0);
__decorate([
    IsDefined(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ComponentValidator, {
        discriminator: {
            property: 'type',
            subTypes: [
                { value: SeparatorValidator, name: 'separator' },
                { value: ActionRowValidator, name: 'action-row' },
                { value: TextDisplayValidator, name: 'text-display' },
                { value: SectionValidator, name: 'section' },
                { value: MediaGalleryValidator, name: 'media-gallery' },
                { value: FileValidator, name: 'file' }
            ],
        },
        keepDiscriminatorProperty: true
    }),
    __metadata("design:type", Array)
], RepeatContainerValidator.prototype, "template", void 0);
class ContainerValidator extends ComponentValidator {
    color;
    spoiler;
    components;
}
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], ContainerValidator.prototype, "color", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ContainerValidator.prototype, "spoiler", void 0);
__decorate([
    IsDefined(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ComponentValidator, {
        discriminator: {
            property: 'type',
            subTypes: [
                { value: SeparatorValidator, name: 'separator' },
                { value: ActionRowValidator, name: 'action-row' },
                { value: TextDisplayValidator, name: 'text-display' },
                { value: SectionValidator, name: 'section' },
                { value: MediaGalleryValidator, name: 'media-gallery' },
                { value: FileValidator, name: 'file' },
                { value: RepeatContainerValidator, name: 'repeat' }
            ],
        },
        keepDiscriminatorProperty: true
    }),
    __metadata("design:type", Array)
], ContainerValidator.prototype, "components", void 0);
class RepeatComponentValidator extends ComponentValidator {
    'data-source';
    template;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], RepeatComponentValidator.prototype, "data-source", void 0);
__decorate([
    IsDefined(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ComponentValidator, {
        discriminator: {
            property: 'type',
            subTypes: [
                { value: SeparatorValidator, name: 'separator' },
                { value: ActionRowValidator, name: 'action-row' },
                { value: TextDisplayValidator, name: 'text-display' },
                { value: SectionValidator, name: 'section' },
                { value: MediaGalleryValidator, name: 'media-gallery' },
                { value: FileValidator, name: 'file' },
                { value: ContainerValidator, name: 'container' }
            ],
        },
        keepDiscriminatorProperty: true
    }),
    __metadata("design:type", Array)
], RepeatComponentValidator.prototype, "template", void 0);
class ActionRowsValidator {
    1;
    2;
    3;
    4;
    5;
}
__decorate([
    IsDefined(),
    ValidateNested({ each: true }),
    IsArray(),
    ActionRowComponentType(),
    __metadata("design:type", Array)
], ActionRowsValidator.prototype, 1, void 0);
__decorate([
    IsOptional(),
    ValidateNested({ each: true }),
    IsArray(),
    ActionRowComponentType(),
    __metadata("design:type", Array)
], ActionRowsValidator.prototype, 2, void 0);
__decorate([
    IsOptional(),
    ValidateNested({ each: true }),
    IsArray(),
    ActionRowComponentType(),
    __metadata("design:type", Array)
], ActionRowsValidator.prototype, 3, void 0);
__decorate([
    IsOptional(),
    ValidateNested({ each: true }),
    IsArray(),
    ActionRowComponentType(),
    __metadata("design:type", Array)
], ActionRowsValidator.prototype, 4, void 0);
__decorate([
    IsOptional(),
    ValidateNested({ each: true }),
    IsArray(),
    ActionRowComponentType(),
    __metadata("design:type", Array)
], ActionRowsValidator.prototype, 5, void 0);
class MessageEmbedFieldValidator extends WithCondition {
    name;
    value;
    inline;
}
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], MessageEmbedFieldValidator.prototype, "name", void 0);
__decorate([
    IsDefined(),
    IsString(),
    __metadata("design:type", String)
], MessageEmbedFieldValidator.prototype, "value", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], MessageEmbedFieldValidator.prototype, "inline", void 0);
class MessageEmbedValidator extends WithCondition {
    title;
    description;
    url;
    color;
    timestamp;
    footer;
    'footer-icon';
    image;
    thumbnail;
    author;
    'author-icon';
    'author-url';
    fields;
}
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "title", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", String)
], MessageEmbedValidator.prototype, "url", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "color", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], MessageEmbedValidator.prototype, "timestamp", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "footer", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "footer-icon", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "image", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "thumbnail", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "author", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "author-icon", void 0);
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageEmbedValidator.prototype, "author-url", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => MessageEmbedFieldValidator),
    __metadata("design:type", Array)
], MessageEmbedValidator.prototype, "fields", void 0);
export class MessageValidator {
    content;
    embeds;
    'action-rows';
    components;
    ephemeral;
    'disable-mentions';
}
__decorate([
    IsOptional(),
    IsString({ each: true }),
    __metadata("design:type", Object)
], MessageValidator.prototype, "content", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => MessageEmbedValidator),
    __metadata("design:type", Array)
], MessageValidator.prototype, "embeds", void 0);
__decorate([
    IsOptional(),
    ValidateNested(),
    Type(() => ActionRowsValidator),
    __metadata("design:type", ActionRowsValidator)
], MessageValidator.prototype, "action-rows", void 0);
__decorate([
    IsOptional(),
    IsArray({
        message: 'Components are now using Discord’s new style for building message layouts. To keep using the old system, please rename ‘components’ to ‘action-rows’'
    }),
    ValidateNested({ each: true }),
    IsArray(),
    TypeTopMessageComponentValidator(),
    __metadata("design:type", Array)
], MessageValidator.prototype, "components", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], MessageValidator.prototype, "ephemeral", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], MessageValidator.prototype, "disable-mentions", void 0);
