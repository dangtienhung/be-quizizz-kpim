"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BaseDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var BaseDto = /** @class */ (function () {
    function BaseDto() {
        this.isPublic = true;
        this.isDeleted = false;
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], BaseDto.prototype, "title");
    __decorate([
        swagger_1.ApiProperty()
    ], BaseDto.prototype, "description");
    __decorate([
        swagger_1.ApiProperty()
    ], BaseDto.prototype, "thumbnail");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsArray()
    ], BaseDto.prototype, "user");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsArray(),
        class_validator_1.ArrayNotEmpty()
    ], BaseDto.prototype, "questions");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsBoolean()
    ], BaseDto.prototype, "isPublic");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsBoolean()
    ], BaseDto.prototype, "isDeleted");
    __decorate([
        swagger_1.ApiProperty()
    ], BaseDto.prototype, "startDate");
    __decorate([
        swagger_1.ApiProperty()
    ], BaseDto.prototype, "endDate");
    return BaseDto;
}());
exports.BaseDto = BaseDto;
