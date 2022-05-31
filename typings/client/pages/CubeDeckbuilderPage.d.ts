export function CubeDeckbuilderPage({ cube, initialDeck, loginCallback }: {
    cube: any;
    initialDeck: any;
    loginCallback: any;
}): JSX.Element;
export namespace CubeDeckbuilderPage {
    namespace propTypes {
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<(PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }> | null | undefined)[]>;
        }>>;
        const initialDeck: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            cube: PropTypes.Requireable<string>;
            owner: PropTypes.Requireable<string>;
            cubeOwner: PropTypes.Requireable<string>;
            seats: PropTypes.Requireable<(PropTypes.InferProps<{
                description: PropTypes.Validator<string>;
                deck: PropTypes.Validator<(number | null | undefined)[][][]>;
                sideboard: PropTypes.Validator<(number | null | undefined)[][][]>;
                username: PropTypes.Validator<string>;
                userid: PropTypes.Requireable<string>;
                bot: PropTypes.Requireable<(string | null | undefined)[]>;
                name: PropTypes.Validator<string>;
            }> | null | undefined)[]>;
            date: PropTypes.Requireable<string | Date>;
            comments: PropTypes.Requireable<(PropTypes.InferProps<{}> | null | undefined)[]>;
            basics: PropTypes.Validator<number[]>;
        }>>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=CubeDeckbuilderPage.d.ts.map