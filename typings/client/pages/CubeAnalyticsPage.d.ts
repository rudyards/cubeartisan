export function CubeAnalyticsPage({ cube, cubeID, defaultFilterText, defaultTab, defaultFormatId, defaultShowTagColors, loginCallback, cubeAnalytics, }: {
    cube: any;
    cubeID: any;
    defaultFilterText: any;
    defaultTab: any;
    defaultFormatId: any;
    defaultShowTagColors: any;
    loginCallback: any;
    cubeAnalytics: any;
}): JSX.Element;
export namespace CubeAnalyticsPage {
    namespace propTypes {
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            name: PropTypes.Validator<string>;
            shortID: PropTypes.Validator<string>;
            owner: PropTypes.Validator<string>;
            isListed: PropTypes.Validator<boolean>;
            privatePrices: PropTypes.Validator<boolean>;
            isFeatured: PropTypes.Validator<boolean>;
            overrideCategory: PropTypes.Validator<boolean>;
            categoryOverride: PropTypes.Validator<string>;
            categoryPrefixes: PropTypes.Validator<string[]>;
            cards: PropTypes.Validator<PropTypes.InferProps<{
                addedTmsp: PropTypes.Requireable<string>;
                cardID: PropTypes.Validator<string>;
                cmc: PropTypes.Requireable<number>;
                colorCategory: PropTypes.Requireable<string>;
                colors: PropTypes.Requireable<(string | null | undefined)[]>;
                finish: PropTypes.Validator<string>;
                imgBackUrl: PropTypes.Requireable<string>;
                imgUrl: PropTypes.Requireable<string>;
                index: PropTypes.Requireable<number>;
                name: PropTypes.Requireable<string>;
                notes: PropTypes.Requireable<string>;
                rarity: PropTypes.Requireable<string>;
                status: PropTypes.Validator<string>;
                tags: PropTypes.Validator<(string | null | undefined)[]>;
                type_line: PropTypes.Requireable<string>;
                details: PropTypes.Validator<PropTypes.InferProps<{
                    color_identity: PropTypes.Validator<string>;
                    set: PropTypes.Validator<string>;
                    set_name: PropTypes.Validator<string>;
                    foil: PropTypes.Validator<boolean>;
                    nonfoil: PropTypes.Validator<boolean>;
                    collector_number: PropTypes.Validator<string>;
                    released_at: PropTypes.Validator<string>;
                    reprint: PropTypes.Validator<boolean>;
                    promo: PropTypes.Validator<boolean>;
                    prices: PropTypes.Validator<PropTypes.InferProps<{
                        usd: PropTypes.Requireable<number>;
                        usd_foil: PropTypes.Requireable<number>;
                        eur: PropTypes.Requireable<number>;
                        tix: PropTypes.Requireable<number>;
                    }>>;
                    elo: PropTypes.Validator<number>;
                    digital: PropTypes.Validator<boolean>;
                    isToken: PropTypes.Validator<boolean>;
                    border_color: PropTypes.Validator<string>;
                    name: PropTypes.Validator<string>;
                    name_lower: PropTypes.Validator<string>;
                    full_name: PropTypes.Validator<string>;
                    artist: PropTypes.Requireable<string>;
                    scryfall_uri: PropTypes.Validator<string>;
                    rarity: PropTypes.Validator<string>;
                    oracle_text: PropTypes.Requireable<string>;
                    _id: PropTypes.Validator<string>;
                    oracle_id: PropTypes.Validator<string>;
                    cmc: PropTypes.Validator<number>;
                    legalities: PropTypes.Validator<PropTypes.InferProps<{
                        Legacy: PropTypes.Requireable<string>;
                        Modern: PropTypes.Requireable<string>;
                        Standard: PropTypes.Requireable<string>;
                        Pauper: PropTypes.Requireable<string>;
                        Pioneer: PropTypes.Requireable<string>;
                        Brawl: PropTypes.Requireable<string>;
                        Historic: PropTypes.Requireable<string>;
                        Commander: PropTypes.Requireable<string>;
                        Penny: PropTypes.Requireable<string>;
                        Vintage: PropTypes.Requireable<string>;
                    }>>;
                    parsed_cast: PropTypes.Validator<string[]>;
                    colors: PropTypes.Requireable<string[]>;
                    type: PropTypes.Requireable<string>;
                    full_art: PropTypes.Validator<boolean>;
                    language: PropTypes.Validator<string>;
                    mtgo_id: PropTypes.Requireable<number>;
                    layout: PropTypes.Validator<string>;
                    tcgplayer_id: PropTypes.Requireable<string>;
                    loyalty: PropTypes.Requireable<string>;
                    power: PropTypes.Requireable<string>;
                    toughness: PropTypes.Requireable<string>;
                    image_small: PropTypes.Requireable<string>;
                    image_normal: PropTypes.Requireable<string>;
                    art_crop: PropTypes.Requireable<string>;
                    image_flip: PropTypes.Requireable<string>;
                    color_category: PropTypes.Validator<string>;
                    tokens: PropTypes.Requireable<string[]>;
                    popularity: PropTypes.Validator<number>;
                    cubeCount: PropTypes.Validator<number>;
                    pickCount: PropTypes.Validator<number>;
                }>>;
                isUnlimited: PropTypes.Validator<boolean>;
            }>[]>;
            maybe: PropTypes.Validator<PropTypes.InferProps<{
                addedTmsp: PropTypes.Requireable<string>;
                cardID: PropTypes.Validator<string>;
                cmc: PropTypes.Requireable<number>;
                colorCategory: PropTypes.Requireable<string>;
                colors: PropTypes.Requireable<(string | null | undefined)[]>;
                finish: PropTypes.Validator<string>;
                imgBackUrl: PropTypes.Requireable<string>;
                imgUrl: PropTypes.Requireable<string>;
                index: PropTypes.Requireable<number>;
                name: PropTypes.Requireable<string>;
                notes: PropTypes.Requireable<string>;
                rarity: PropTypes.Requireable<string>;
                status: PropTypes.Validator<string>;
                tags: PropTypes.Validator<(string | null | undefined)[]>;
                type_line: PropTypes.Requireable<string>;
                details: PropTypes.Validator<PropTypes.InferProps<{
                    color_identity: PropTypes.Validator<string>;
                    set: PropTypes.Validator<string>;
                    set_name: PropTypes.Validator<string>;
                    foil: PropTypes.Validator<boolean>;
                    nonfoil: PropTypes.Validator<boolean>;
                    collector_number: PropTypes.Validator<string>;
                    released_at: PropTypes.Validator<string>;
                    reprint: PropTypes.Validator<boolean>;
                    promo: PropTypes.Validator<boolean>;
                    prices: PropTypes.Validator<PropTypes.InferProps<{
                        usd: PropTypes.Requireable<number>;
                        usd_foil: PropTypes.Requireable<number>;
                        eur: PropTypes.Requireable<number>;
                        tix: PropTypes.Requireable<number>;
                    }>>;
                    elo: PropTypes.Validator<number>;
                    digital: PropTypes.Validator<boolean>;
                    isToken: PropTypes.Validator<boolean>;
                    border_color: PropTypes.Validator<string>;
                    name: PropTypes.Validator<string>;
                    name_lower: PropTypes.Validator<string>;
                    full_name: PropTypes.Validator<string>;
                    artist: PropTypes.Requireable<string>;
                    scryfall_uri: PropTypes.Validator<string>;
                    rarity: PropTypes.Validator<string>;
                    oracle_text: PropTypes.Requireable<string>;
                    _id: PropTypes.Validator<string>;
                    oracle_id: PropTypes.Validator<string>;
                    cmc: PropTypes.Validator<number>;
                    legalities: PropTypes.Validator<PropTypes.InferProps<{
                        Legacy: PropTypes.Requireable<string>;
                        Modern: PropTypes.Requireable<string>;
                        Standard: PropTypes.Requireable<string>;
                        Pauper: PropTypes.Requireable<string>;
                        Pioneer: PropTypes.Requireable<string>;
                        Brawl: PropTypes.Requireable<string>;
                        Historic: PropTypes.Requireable<string>;
                        Commander: PropTypes.Requireable<string>;
                        Penny: PropTypes.Requireable<string>;
                        Vintage: PropTypes.Requireable<string>;
                    }>>;
                    parsed_cast: PropTypes.Validator<string[]>;
                    colors: PropTypes.Requireable<string[]>;
                    type: PropTypes.Requireable<string>;
                    full_art: PropTypes.Validator<boolean>;
                    language: PropTypes.Validator<string>;
                    mtgo_id: PropTypes.Requireable<number>;
                    layout: PropTypes.Validator<string>;
                    tcgplayer_id: PropTypes.Requireable<string>;
                    loyalty: PropTypes.Requireable<string>;
                    power: PropTypes.Requireable<string>;
                    toughness: PropTypes.Requireable<string>;
                    image_small: PropTypes.Requireable<string>;
                    image_normal: PropTypes.Requireable<string>;
                    art_crop: PropTypes.Requireable<string>;
                    image_flip: PropTypes.Requireable<string>;
                    color_category: PropTypes.Validator<string>;
                    tokens: PropTypes.Requireable<string[]>;
                    popularity: PropTypes.Validator<number>;
                    cubeCount: PropTypes.Validator<number>;
                    pickCount: PropTypes.Validator<number>;
                }>>;
                isUnlimited: PropTypes.Validator<boolean>;
            }>[]>;
            defaultDraftFormat: PropTypes.Validator<number>;
            numDecks: PropTypes.Validator<number>;
            description: PropTypes.Requireable<string>;
            image_uri: PropTypes.Requireable<string>;
            image_artist: PropTypes.Requireable<string>;
            image_name: PropTypes.Requireable<string>;
            owner_name: PropTypes.Requireable<string>;
            date_updated: PropTypes.Requireable<string>;
            updated_string: PropTypes.Requireable<string>;
            defaultSorts: PropTypes.Requireable<string[]>;
            default_show_unsorted: PropTypes.Validator<boolean>;
            card_count: PropTypes.Validator<number>;
            users_following: PropTypes.Validator<string[]>;
            defaultPrinting: PropTypes.Requireable<string>;
            disableNotifications: PropTypes.Validator<boolean>;
            schemaVersion: PropTypes.Validator<number>;
            basics: PropTypes.Validator<string[]>;
            tags: PropTypes.Validator<string[]>;
            cardOracles: PropTypes.Validator<string[]>;
            keywords: PropTypes.Validator<string[]>;
            categories: PropTypes.Validator<string[]>;
        }>>;
        const cubeID: PropTypes.Validator<string>;
        const defaultFilterText: PropTypes.Requireable<string>;
        const defaultTab: PropTypes.Requireable<number>;
        const defaultFormatId: PropTypes.Requireable<number>;
        const defaultShowTagColors: PropTypes.Requireable<boolean>;
        const loginCallback: PropTypes.Requireable<string>;
        const cubeAnalytics: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            shortID: PropTypes.Requireable<string>;
            name: PropTypes.Requireable<string>;
            card_count: PropTypes.Requireable<number>;
            cards: PropTypes.Requireable<(PropTypes.InferProps<{
                addedTmsp: PropTypes.Requireable<string>;
                cardID: PropTypes.Validator<string>;
                cmc: PropTypes.Requireable<number>;
                colorCategory: PropTypes.Requireable<string>;
                colors: PropTypes.Requireable<(string | null | undefined)[]>;
                finish: PropTypes.Validator<string>;
                imgBackUrl: PropTypes.Requireable<string>;
                imgUrl: PropTypes.Requireable<string>;
                index: PropTypes.Requireable<number>;
                name: PropTypes.Requireable<string>;
                notes: PropTypes.Requireable<string>;
                rarity: PropTypes.Requireable<string>;
                status: PropTypes.Validator<string>;
                tags: PropTypes.Validator<(string | null | undefined)[]>;
                type_line: PropTypes.Requireable<string>;
                details: PropTypes.Validator<PropTypes.InferProps<{
                    color_identity: PropTypes.Validator<string>;
                    set: PropTypes.Validator<string>;
                    set_name: PropTypes.Validator<string>;
                    foil: PropTypes.Validator<boolean>;
                    nonfoil: PropTypes.Validator<boolean>;
                    collector_number: PropTypes.Validator<string>;
                    released_at: PropTypes.Validator<string>;
                    reprint: PropTypes.Validator<boolean>;
                    promo: PropTypes.Validator<boolean>;
                    prices: PropTypes.Validator<PropTypes.InferProps<{
                        usd: PropTypes.Requireable<number>;
                        usd_foil: PropTypes.Requireable<number>;
                        eur: PropTypes.Requireable<number>;
                        tix: PropTypes.Requireable<number>;
                    }>>;
                    elo: PropTypes.Validator<number>;
                    digital: PropTypes.Validator<boolean>;
                    isToken: PropTypes.Validator<boolean>;
                    border_color: PropTypes.Validator<string>;
                    name: PropTypes.Validator<string>;
                    name_lower: PropTypes.Validator<string>;
                    full_name: PropTypes.Validator<string>;
                    artist: PropTypes.Requireable<string>;
                    scryfall_uri: PropTypes.Validator<string>;
                    rarity: PropTypes.Validator<string>;
                    oracle_text: PropTypes.Requireable<string>;
                    _id: PropTypes.Validator<string>;
                    oracle_id: PropTypes.Validator<string>;
                    cmc: PropTypes.Validator<number>;
                    legalities: PropTypes.Validator<PropTypes.InferProps<{
                        Legacy: PropTypes.Requireable<string>;
                        Modern: PropTypes.Requireable<string>;
                        Standard: PropTypes.Requireable<string>;
                        Pauper: PropTypes.Requireable<string>;
                        Pioneer: PropTypes.Requireable<string>;
                        Brawl: PropTypes.Requireable<string>;
                        Historic: PropTypes.Requireable<string>;
                        Commander: PropTypes.Requireable<string>;
                        Penny: PropTypes.Requireable<string>;
                        Vintage: PropTypes.Requireable<string>;
                    }>>;
                    parsed_cast: PropTypes.Validator<string[]>;
                    colors: PropTypes.Requireable<string[]>;
                    type: PropTypes.Requireable<string>;
                    full_art: PropTypes.Validator<boolean>;
                    language: PropTypes.Validator<string>;
                    mtgo_id: PropTypes.Requireable<number>;
                    layout: PropTypes.Validator<string>;
                    tcgplayer_id: PropTypes.Requireable<string>;
                    loyalty: PropTypes.Requireable<string>;
                    power: PropTypes.Requireable<string>;
                    toughness: PropTypes.Requireable<string>;
                    image_small: PropTypes.Requireable<string>;
                    image_normal: PropTypes.Requireable<string>;
                    art_crop: PropTypes.Requireable<string>;
                    image_flip: PropTypes.Requireable<string>;
                    color_category: PropTypes.Validator<string>;
                    tokens: PropTypes.Requireable<string[]>;
                    popularity: PropTypes.Validator<number>;
                    cubeCount: PropTypes.Validator<number>;
                    pickCount: PropTypes.Validator<number>;
                }>>;
                isUnlimited: PropTypes.Validator<boolean>;
            }> | null | undefined)[]>;
            type: PropTypes.Requireable<string>;
            overrideCategory: PropTypes.Requireable<boolean>;
            categoryOverride: PropTypes.Requireable<string>;
            categoryPrefixes: PropTypes.Requireable<(string | null | undefined)[]>;
            image_name: PropTypes.Requireable<string>;
            image_artist: PropTypes.Requireable<string>;
            image_uri: PropTypes.Requireable<string>;
            owner: PropTypes.Requireable<string>;
            owner_name: PropTypes.Requireable<string>;
            disableNotifications: PropTypes.Requireable<boolean>;
        }>>;
    }
    namespace defaultProps {
        const defaultFilterText_1: string;
        export { defaultFilterText_1 as defaultFilterText };
        const defaultTab_1: number;
        export { defaultTab_1 as defaultTab };
        const defaultFormatId_1: null;
        export { defaultFormatId_1 as defaultFormatId };
        const defaultShowTagColors_1: boolean;
        export { defaultShowTagColors_1 as defaultShowTagColors };
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: () => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=CubeAnalyticsPage.d.ts.map