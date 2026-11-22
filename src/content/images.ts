import type { ProjectImage } from "./types";

/**
 * Reference interior imagery (royalty-free stock, public/reference/).
 *
 * These are NOT Lahima In-Des projects. They exist so the layout can be
 * reviewed with realistic imagery. Replace with real portfolio exports
 * (see public/projects/<slug>/README.md) before launch. While
 * `featureFlags.showReferenceBadges` is true every such image carries a
 * visible "Reference image" chip so it can never pass as a completed project.
 */
export type ReferenceKey =
  | "living"
  | "hero"
  | "dining"
  | "detail"
  | "bedroom"
  | "compact"
  | "hotel"
  | "office"
  | "school"
  | "retail"
  | "kitchen"
  | "pooja"
  | "flooring"
  | "windows"
  | "improvement"
  | "officeLobby"
  | "hotelLobby"
  | "showroom"
  | "workspace"
  | "cafeCoimbatore"
  | "cafeKilpauk"
  | "spa"
  | "restaurant"
  | "mixedUseCochin"
  | "mixedUseSalem"
  | "urbanOasis"
  | "villaEcr"
  | "residenceConcept"
  | "customDetails"
  | "architectureConcept"
  | "renovation"
  | "residentialHome"
  | "institution"
  | "roomBedroom"
  | "roomLiving"
  | "roomDining"
  | "homeLiving"
  | "homeKitchen"
  | "boardroom"
  | "corporateFloor"
  | "ceilingLiving"
  | "ceilingOffice"
  | "ceilingHospitality"
  | "epoxyFloor"
  | "hvac"
  | "furnitureCustom"
  | "elevation"
  | "glassFitting"
  | "instCorridor"
  | "glassStorefront"
  | "glassRailing"
  | "epoxyWorkshop"
  | "epoxyCorridor"
  | "hvacCafe"
  | "hvacHome"
  | "wardrobeUnit"
  | "tvUnit"
  | "kitchenCabinets"
  | "poojaModern"
  | "heroCompanyOffice"
  | "heroCompanyMeeting"
  | "heroCompanyLounge"
  | "heroCompanyWorkspace"
  | "heroCompanyFloor"
  | "paintingRoom"
  | "paintingWallpaper"
  | "paintingDecor"
  | "plumbingBath"
  | "plumbingKitchen"
  | "plumbingUtility"
  | "electricalBoard"
  | "electricalSwitches"
  | "electricalLighting"
  | "civilStructure"
  | "civilMasonry"
  | "civilSite"
  | "ledCove"
  | "ledLinear"
  | "ledFeature"
  | "elevationWorksFacade"
  | "elevationWorksStreet"
  | "elevationWorksVilla"
  | "ceilingTradeLiving"
  | "ceilingTradeOffice"
  | "ceilingTradeHospitality";

export const referenceImages: Record<ReferenceKey, ProjectImage> = {
  living: {
    src: "/reference/living.jpg",
    alt: "Bright living room with a tan leather sofa, white lounge chairs and a framed photo wall",
    width: 1800,
    height: 1350,
  },
  hero: {
    src: "/reference/hero.jpg",
    alt: "Wide living space with a grey sofa, timber coffee table and tall windows",
    width: 1800,
    height: 949,
  },
  dining: {
    src: "/reference/dining.jpg",
    alt: "Dining area with green velvet chairs, a round mirror and a pendant light",
    width: 1800,
    height: 1013,
  },
  detail: {
    src: "/reference/detail.jpg",
    alt: "Entry nook with a timber plank ceiling, round mirror, rattan sideboard and herringbone floor",
    width: 1800,
    height: 3200,
  },
  bedroom: {
    src: "/reference/bedroom.jpg",
    alt: "Bedroom with a channelled upholstered bed, brass pendant light and floor-length curtains",
    width: 1800,
    height: 1800,
  },
  compact: {
    src: "/reference/compact.jpg",
    alt: "Open-plan apartment interior with corner windows, armchairs and a dining area",
    width: 1800,
    height: 1200,
  },
  hotel: {
    src: "/reference/hotel.jpg",
    alt: "Timber resort building with a pool deck and cushioned loungers at dusk",
    width: 1800,
    height: 1200,
  },
  office: {
    src: "/reference/office.jpg",
    alt: "Open office floor with glazed partitions, a timber shelving unit and pendant lights",
    width: 1800,
    height: 1202,
  },
  school: {
    src: "/reference/school.jpg",
    alt: "Classroom with timber and metal desks, chairs and a green board",
    width: 1800,
    height: 1013,
  },
  retail: {
    src: "/reference/retail.jpg",
    alt: "Minimal boutique interior with oak display shelves, a clothing rail and track lighting",
    width: 1024,
    height: 768,
  },
  kitchen: {
    src: "/reference/room-kitchen.jpg",
    alt: "Modular kitchen with ivory and walnut cabinets, quartz counters and glass pendant lights",
    width: 1024,
    height: 768,
  },
  pooja: {
    src: "/reference/room-pooja.jpg",
    alt: "Carved teak pooja unit with brass lamps and a backlit marble panel",
    width: 1024,
    height: 768,
  },
  flooring: {
    src: "/reference/room-flooring.jpg",
    alt: "Living room with wide plank natural oak flooring and tall windows",
    width: 1024,
    height: 768,
  },
  windows: {
    src: "/reference/room-windows.jpg",
    alt: "Window dressed with layered sheer and linen curtains beside an armchair",
    width: 1024,
    height: 768,
  },
  improvement: {
    src: "/reference/room-improvement.jpg",
    alt: "Living room with a false ceiling, cove lighting, chandelier and textured feature wall",
    width: 1024,
    height: 768,
  },
  officeLobby: {
    src: "/reference/office-lobby.jpg",
    alt: "Clean commercial office lobby with a white reception desk, slatted oak wall and floor-to-ceiling glazing (design visualization)",
    width: 1920,
    height: 1080,
  },
  hotelLobby: {
    src: "/reference/hotel-lobby.jpg",
    alt: "Hotel lobby with a marble reception desk, sculptural chandelier and curved lounge seating (design visualization)",
    width: 1920,
    height: 1080,
  },
  showroom: {
    src: "/reference/showroom.jpg",
    alt: "Bright retail showroom with lit display shelving, track lighting and a stone floor (design visualization)",
    width: 1920,
    height: 1080,
  },
  workspace: {
    src: "/reference/office-workspace.jpg",
    alt: "Open workspace interior concept with desks, meeting areas and soft lighting (design visualization)",
    width: 1600,
    height: 1200,
  },
  cafeCoimbatore: {
    src: "/reference/cafe-coimbatore.jpg",
    alt: "Cafe interior concept with seating, counter and warm lighting (design visualization)",
    width: 1600,
    height: 1200,
  },
  cafeKilpauk: {
    src: "/reference/cafe-kilpauk.jpg",
    alt: "Corner cafe interior concept with a service counter, seating and plants (design visualization)",
    width: 1600,
    height: 1200,
  },
  spa: {
    src: "/reference/spa.jpg",
    alt: "Calm spa lounge with a stone feature wall, oak console and a bowl of floating candles (design visualization)",
    width: 1600,
    height: 1200,
  },
  restaurant: {
    src: "/reference/restaurant.jpg",
    alt: "Restaurant dining room concept with warm lighting and upholstered seating (design visualization)",
    width: 1600,
    height: 1200,
  },
  mixedUseCochin: {
    src: "/reference/mixed-use-cochin.jpg",
    alt: "Mixed-use building concept with ground-floor retail and landscaped upper terraces (design visualization)",
    width: 1600,
    height: 1200,
  },
  mixedUseSalem: {
    src: "/reference/mixed-use-salem.jpg",
    alt: "Mixed-use building concept with a layered facade and ground-floor shopfronts (design visualization)",
    width: 1600,
    height: 1200,
  },
  urbanOasis: {
    src: "/reference/urban-oasis.jpg",
    alt: "Urban courtyard concept with planting, timber screens and layered terraces (design visualization)",
    width: 1600,
    height: 1200,
  },
  villaEcr: {
    src: "/reference/villa-ecr.jpg",
    alt: "Coastal villa concept with deep verandahs, timber louvres and a garden courtyard (design visualization)",
    width: 1600,
    height: 1200,
  },
  residenceConcept: {
    src: "/reference/residence-concept.jpg",
    alt: "Contemporary residence concept with a clean elevation and landscaped entry (design visualization)",
    width: 1600,
    height: 1200,
  },
  customDetails: {
    src: "/reference/custom-details.jpg",
    alt: "Close-up of custom joinery with fluted timber panels and brass inlay detailing",
    width: 1600,
    height: 1200,
  },
  architectureConcept: {
    src: "/reference/architecture-concept.jpg",
    alt: "Architectural concept model showing massing and elevation studies (design visualization)",
    width: 1600,
    height: 1200,
  },
  renovation: {
    src: "/reference/renovation.jpg",
    alt: "Renovated apartment living area with herringbone oak flooring and a built-in display unit",
    width: 1600,
    height: 1200,
  },
  residentialHome: {
    src: "/reference/residential-home.jpg",
    alt: "Open kitchen flowing into a warm family living area with a window seat view",
    width: 1600,
    height: 1200,
  },
  institution: {
    src: "/reference/institution.jpg",
    alt: "Institutional library with long timber study tables, bookshelves and daylight",
    width: 1600,
    height: 1200,
  },
  roomBedroom: {
    src: "/reference/room-bedroom.jpg",
    alt: "Master bedroom with an upholstered headboard, fluted wood wall and sheer curtains",
    width: 1600,
    height: 1200,
  },
  roomLiving: {
    src: "/reference/room-living.jpg",
    alt: "Living room with a floating walnut TV console, stone feature wall and backlit shelves",
    width: 1600,
    height: 1200,
  },
  roomDining: {
    src: "/reference/room-dining.jpg",
    alt: "Dining room with a solid wood table, upholstered chairs and a lit crockery cabinet",
    width: 1600,
    height: 1200,
  },
  homeLiving: {
    src: "/reference/home-living-wide.jpg",
    alt: "Home living room with a cream sectional, walnut and stone TV wall and a cove-lit ceiling (design visualization)",
    width: 1920,
    height: 1080,
  },
  homeKitchen: {
    src: "/reference/home-kitchen-wide.jpg",
    alt: "Home kitchen with a marble island, glass pendants and an open dining area (design visualization)",
    width: 1920,
    height: 1080,
  },
  boardroom: {
    src: "/reference/corporate-boardroom.jpg",
    alt: "Corporate boardroom with a long walnut table, grey task chairs and floor-to-ceiling glazing (design visualization)",
    width: 1920,
    height: 1080,
  },
  corporateFloor: {
    src: "/reference/corporate-floor.jpg",
    alt: "Corporate open-plan office floor with white workstations and glass-fronted meeting rooms (design visualization)",
    width: 1920,
    height: 1080,
  },
  ceilingLiving: {
    src: "/reference/ceiling-living.jpg",
    alt: "Living room ceiling with a timber slatted panel, cove lighting and a globe chandelier (design visualization)",
    width: 1600,
    height: 1200,
  },
  ceilingOffice: {
    src: "/reference/ceiling-office.jpg",
    alt: "Office reception ceiling with timber baffles, linear lights and a curved lit drop ceiling (design visualization)",
    width: 1600,
    height: 1200,
  },
  ceilingHospitality: {
    src: "/reference/ceiling-hospitality.jpg",
    alt: "Coffered hospitality ceiling with brass trim, cove lighting and round pendant lights (design visualization)",
    width: 1600,
    height: 1200,
  },
  epoxyFloor: {
    src: "/reference/service-epoxy.jpg",
    alt: "Showroom with a seamless glossy grey epoxy floor and track lighting (design visualization)",
    width: 1600,
    height: 1200,
  },
  hvac: {
    src: "/reference/service-hvac.jpg",
    alt: "Office with ceiling cassette air conditioners and linear air diffusers (design visualization)",
    width: 1600,
    height: 1200,
  },
  furnitureCustom: {
    src: "/reference/service-furniture.jpg",
    alt: "Custom walnut and fluted ivory wardrobe, shelving and study desk unit (design visualization)",
    width: 1600,
    height: 1200,
  },
  elevation: {
    src: "/reference/service-elevation.jpg",
    alt: "Commercial building elevation with stone cladding, glass, vertical fins and a lit canopy at dusk (design visualization)",
    width: 1600,
    height: 1200,
  },
  glassFitting: {
    src: "/reference/service-glass.jpg",
    alt: "Frameless glass partition and door enclosing a meeting room (design visualization)",
    width: 1600,
    height: 1200,
  },
  instCorridor: {
    src: "/reference/services/svc-institution-corridor.jpg",
    alt: "School or college corridor with timber lockers, window seating and a polished floor (design visualization)",
    width: 1024,
    height: 768,
  },
  glassStorefront: {
    src: "/reference/services/svc-glass-storefront.jpg",
    alt: "Frameless glass storefront and door set into a stone-clad facade at dusk (design visualization)",
    width: 1024,
    height: 768,
  },
  glassRailing: {
    src: "/reference/services/svc-glass-railing.jpg",
    alt: "Timber staircase with a frameless glass balustrade and steel handrail (design visualization)",
    width: 1024,
    height: 768,
  },
  epoxyWorkshop: {
    src: "/reference/services/svc-epoxy-workshop.jpg",
    alt: "Workshop with a seamless glossy epoxy floor and yellow safety lane markings (design visualization)",
    width: 1024,
    height: 768,
  },
  epoxyCorridor: {
    src: "/reference/services/svc-epoxy-corridor.jpg",
    alt: "Office corridor with a seamless glossy sand-coloured epoxy floor and glass partitions (design visualization)",
    width: 1024,
    height: 768,
  },
  hvacCafe: {
    src: "/reference/services/svc-hvac-cafe.jpg",
    alt: "Cafe ceiling with cassette air conditioners and slim linear diffusers beside pendant lights (design visualization)",
    width: 1024,
    height: 768,
  },
  hvacHome: {
    src: "/reference/services/svc-hvac-home.jpg",
    alt: "Living room with a flush linear air diffuser in a cove-lit false ceiling (design visualization)",
    width: 1024,
    height: 768,
  },
  wardrobeUnit: {
    src: "/reference/scope/scope-bedroom-wardrobes.jpg",
    alt: "Full-height wardrobe with fluted walnut and ivory sliding doors (design visualization)",
    width: 1024,
    height: 768,
  },
  tvUnit: {
    src: "/reference/scope/scope-living-tv.jpg",
    alt: "Floating walnut TV unit with backlit open shelving (design visualization)",
    width: 1024,
    height: 768,
  },
  kitchenCabinets: {
    src: "/reference/scope/scope-kitchen-cabinets.jpg",
    alt: "Kitchen cabinetry in matte ivory and walnut with under-cabinet lighting (design visualization)",
    width: 1024,
    height: 768,
  },
  poojaModern: {
    src: "/reference/scope/scope-pooja-modern.jpg",
    alt: "Modern wall-mounted pooja unit with a backlit panel (design visualization)",
    width: 1024,
    height: 768,
  },
  paintingRoom: {
    src: "/reference/services/svc-painting-1.jpg",
    alt: "Freshly painted interior wall with a clean smooth finish (photograph)",
    width: 1200,
    height: 900,
  },
  paintingWallpaper: {
    src: "/reference/services/svc-painting-2.jpg",
    alt: "Paint rollers and tools ready for interior painting (photograph)",
    width: 1200,
    height: 900,
  },
  paintingDecor: {
    src: "/reference/services/svc-painting-3.jpg",
    alt: "Bright painted kitchen and living space with white walls (photograph)",
    width: 1200,
    height: 900,
  },
  plumbingBath: {
    src: "/reference/services/svc-plumbing-1.jpg",
    alt: "Modern bathroom with shower, bathtub and vanity taps (photograph)",
    width: 1400,
    height: 1050,
  },
  plumbingKitchen: {
    src: "/reference/services/svc-plumbing-2.jpg",
    alt: "Kitchen island with double sink and spring mixer tap (photograph)",
    width: 1400,
    height: 1050,
  },
  plumbingUtility: {
    src: "/reference/services/svc-plumbing-3.jpg",
    alt: "Bright bathroom with double basin taps, bathtub and shower (photograph)",
    width: 1400,
    height: 1050,
  },
  electricalBoard: {
    src: "/reference/services/svc-electrical-1.jpg",
    alt: "Electrical wiring and conduit work in progress (photograph)",
    width: 1200,
    height: 900,
  },
  electricalSwitches: {
    src: "/reference/services/svc-electrical-2.jpg",
    alt: "Interior space prepared for switches, sockets and lighting points (photograph)",
    width: 1200,
    height: 900,
  },
  electricalLighting: {
    src: "/reference/services/svc-electrical-3.jpg",
    alt: "Lit interior showing coordinated electrical lighting (photograph)",
    width: 1200,
    height: 900,
  },
  civilStructure: {
    src: "/reference/services/svc-civil-1.jpg",
    alt: "Building under construction with civil structural works (photograph)",
    width: 1200,
    height: 900,
  },
  civilMasonry: {
    src: "/reference/services/svc-civil-2.jpg",
    alt: "Site with masonry and concrete civil works underway (photograph)",
    width: 1200,
    height: 900,
  },
  civilSite: {
    src: "/reference/services/svc-civil-3.jpg",
    alt: "Active construction site for civil works (photograph)",
    width: 1200,
    height: 900,
  },
  ledCove: {
    src: "/reference/services/svc-led-1.jpg",
    alt: "Ceiling with hanging and accent LED lighting (photograph)",
    width: 1200,
    height: 900,
  },
  ledLinear: {
    src: "/reference/services/svc-led-2.jpg",
    alt: "Architectural LED lighting creating a coloured wash (photograph)",
    width: 1200,
    height: 900,
  },
  ledFeature: {
    src: "/reference/services/svc-led-3.jpg",
    alt: "Feature pendant and LED mood lighting in an interior (photograph)",
    width: 1200,
    height: 900,
  },
  elevationWorksFacade: {
    src: "/reference/services/svc-elevworks-1.jpg",
    alt: "Modern glass and cladding building elevation (photograph)",
    width: 1200,
    height: 900,
  },
  elevationWorksStreet: {
    src: "/reference/services/svc-elevworks-2.jpg",
    alt: "Multi-storey apartment elevation from the street (photograph)",
    width: 1200,
    height: 900,
  },
  elevationWorksVilla: {
    src: "/reference/services/svc-elevworks-3.jpg",
    alt: "Residential house elevation with exterior finishes (photograph)",
    width: 1200,
    height: 900,
  },
  ceilingTradeLiving: {
    src: "/reference/services/svc-ceiling-1.jpg",
    alt: "Modern interior with a designed false ceiling (photograph)",
    width: 1200,
    height: 900,
  },
  ceilingTradeOffice: {
    src: "/reference/services/svc-ceiling-2.jpg",
    alt: "Contemporary room with a clean ceiling and lighting (photograph)",
    width: 1200,
    height: 900,
  },
  ceilingTradeHospitality: {
    src: "/reference/services/svc-ceiling-3.jpg",
    alt: "Interior ceiling detail with soft architectural light (photograph)",
    width: 1200,
    height: 900,
  },
  heroCompanyOffice: {
    src: "/reference/hero-company-office.jpg",
    alt: "Professional company office corridor with glass meeting rooms and a fitted kitchenette (photograph)",
    width: 1920,
    height: 1280,
  },
  heroCompanyMeeting: {
    src: "/reference/hero-company-meeting.jpg",
    alt: "Corporate meeting room with a long conference table and floor-to-ceiling glazing (photograph)",
    width: 1920,
    height: 1280,
  },
  heroCompanyLounge: {
    src: "/reference/hero-company-lounge.jpg",
    alt: "Modern office lounge and corridor with glass partitions (photograph)",
    width: 1920,
    height: 1280,
  },
  heroCompanyWorkspace: {
    src: "/reference/hero-company-workspace.jpg",
    alt: "Open-plan company workspace with desks, pendant lights and large windows (photograph)",
    width: 1920,
    height: 1280,
  },
  heroCompanyFloor: {
    src: "/reference/hero-company-floor.jpg",
    alt: "Busy corporate office floor with workstations and a double-height interior (photograph)",
    width: 1920,
    height: 1280,
  },
};
