// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

/**
 * SF Symbols to Material Icons mappings for Civilian Law of Knowledge app.
 */
const MAPPING: Record<string, MaterialIconName> = {
  // Tab bar icons
  "house.fill": "home",
  "shield.fill": "shield",
  "bell.fill": "notifications",
  "book.fill": "menu-book",
  "bubble.left.fill": "chat",
  // Navigation icons
  "chevron.right": "chevron-right",
  "chevron.left": "chevron-left",
  "chevron.down": "expand-more",
  "chevron.up": "expand-less",
  // Action icons
  "magnifyingglass": "search",
  "xmark": "close",
  "arrow.up.right": "open-in-new",
  "paperplane.fill": "send",
  "trash": "delete",
  "info.circle": "info",
  "exclamationmark.triangle": "warning",
  "checkmark.circle.fill": "check-circle",
  "xmark.circle.fill": "cancel",
  "phone.fill": "phone",
  "phone.arrow.up.right": "phone-forwarded",
  // Content icons
  "doc.text": "description",
  "link": "link",
  "person.fill": "person",
  "person.2.fill": "people",
  "gavel": "gavel",
  "scale.3d": "balance",
  "building.columns": "account-balance",
  "heart.fill": "favorite",
  "heart.circle.fill": "favorite-border",
  "star.fill": "star",
  "star.circle.fill": "stars",
  "questionmark.circle": "help",
  "lightbulb": "lightbulb",
  "calendar": "calendar-today",
  "clock.arrow.circlepath": "history",
  // Category icons
  "cross.case.fill": "medical-services",
  "cross.fill": "local-hospital",
  "hands.sparkles": "clean-hands",
  "figure.stand": "accessibility",
  "list.bullet.clipboard": "assignment",
  "checkmark.shield": "verified-user",
  "checkmark.shield.fill": "verified-user",
  // Family & Support icons
  "hand.raised.fill": "pan-tool",
  "briefcase.fill": "work",
  "shippingbox.fill": "inventory-2",
  "shippingbox": "inventory-2",
  "bubble.left.and.bubble.right.fill": "forum",
  "arrow.triangle.2.circlepath": "sync",
  "arrow.triangle.branch": "call-split",
  "arrow.uturn.right.circle.fill": "redo",
  // Job & Resources icons
  "graduationcap.fill": "school",
  "cart": "shopping-cart",
  "fork.knife": "restaurant",
  "hammer": "construction",
  "square.grid.2x2": "grid-view",
  "checkmark.seal.fill": "verified",
  "arrow.uturn.right.circle": "redo",
  // Utility icons
  "leaf.fill": "eco",
  "bolt.fill": "bolt",
  "car.fill": "directions-car",
  "tshirt.fill": "checkroom",
  // Brain & Mental Health
  "brain.head.profile": "psychology",
  "heart.text.square.fill": "healing",
  // QR Code & Sharing
  "qrcode": "qr-code-2",
  "qrcode.viewfinder": "qr-code-scanner",
  "square.and.arrow.up": "share",
  "doc.text.fill": "description",
  "note.text": "note",
  "checklist": "checklist",
  "checkmark": "check",
  "exclamationmark.triangle.fill": "warning",
  "plus": "add",
  "plus.circle.fill": "add-circle",
  // Additional icons
  "clock": "schedule",
  "bell": "notifications-none",
  "globe": "language",
  "phone": "phone",
  "lock.fill": "lock",
  "hand.raised": "pan-tool",
  "video": "videocam",
  "dollarsign.circle": "attach-money",
  // Grievance & Accountability
  "exclamationmark.bubble": "report-problem",
  "doc.on.clipboard": "content-paste",
  "pencil.and.outline": "edit",
  "flag.fill": "flag",
  "megaphone.fill": "campaign",
  // Work Release & Banking
  "banknote": "payments",
  "building.2": "business",
  "bus": "directions-bus",
  "wrench.and.screwdriver": "build",
  // Education & Certs
  "book.closed": "auto-stories",
  "pencil": "edit",
  "laptopcomputer": "computer",
  "trophy.fill": "emoji-events",
  "rectangle.stack.badge.person.crop": "badge",
  // Tablet & Tech
  "ipad": "tablet",
  "wifi": "wifi",
  "play.circle": "play-circle-outline",
  "mic.fill": "mic",
  "arrow.down.circle": "download",
  "map.fill": "map",
  "envelope.fill": "email",
  // SSI & Benefits
  "creditcard": "credit-card",
  "doc.richtext": "article",
  "stethoscope": "local-hospital",
  // Lawyer & Legal
  "person.crop.rectangle": "contact-page",
  "text.badge.star": "rate-review",
  "building.fill": "domain",
  // Outdoor & Hunting
  "leaf.arrow.circlepath": "nature",
  "scope": "track-changes",
  "fish": "set-meal",
  "tree": "park",
  // Probation & Parole
  "figure.walk": "directions-walk",
  "airplane": "flight",
  "location.fill": "location-on",
  // Voting & Rights
  "hand.thumbsup.fill": "thumb-up",
  "checkmark.rectangle": "how-to-vote",
  // Child Support
  "figure.and.child.holdinghands": "family-restroom",
  // Veterans
  "star.circle": "military-tech",
  "medal.fill": "military-tech",
  // Immigration
  "airplane.departure": "flight-takeoff",
  "doc.badge.gearshape": "policy",
  // Warrant
  "eye.fill": "visibility",
  "shield.lefthalf.filled": "security",
  // Additional navigation
  "person.text.rectangle": "contact-page",
  "arrow.right.circle": "arrow-forward",
};

type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
