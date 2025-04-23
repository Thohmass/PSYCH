"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TherapyType = exports.Specialization = exports.UserRole = void 0;
// client/src/constants/roles.ts
var UserRole;
(function (UserRole) {
    UserRole["Client"] = "client";
    UserRole["Psychologist"] = "psychologist";
    UserRole["Admin"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var Specialization;
(function (Specialization) {
    Specialization["Anxiety"] = "Anxiety";
    Specialization["Depression"] = "Depression";
    Specialization["Relationships"] = "Relationships";
    Specialization["Stress"] = "Stress";
    Specialization["Trauma"] = "Trauma";
    // Pridajú sa ďalšie špecializácie podľa potreby
})(Specialization || (exports.Specialization = Specialization = {}));
var TherapyType;
(function (TherapyType) {
    TherapyType["CBT"] = "CBT";
    TherapyType["Psychodynamic"] = "Psychodynamic";
    TherapyType["Humanistic"] = "Humanistic";
    TherapyType["FamilyTherapy"] = "Family Therapy";
    // Pridajú sa ďalšie typy terapií podľa potreby
})(TherapyType || (exports.TherapyType = TherapyType = {}));
//# sourceMappingURL=roles.js.map