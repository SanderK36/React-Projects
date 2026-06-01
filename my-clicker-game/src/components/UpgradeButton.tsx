type UpgradeButtonProps = {
    name: string;
    description: string;
    cost: number;
    points: number;
    onBuy: () => void;
}

function UpgradeButton({ name, description, cost, points, onBuy }: UpgradeButtonProps) {
    return (
        <button onClick={onBuy} disabled={points < cost}>
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Cost: {cost}</p>
        </button>
    )
}

export default UpgradeButton;