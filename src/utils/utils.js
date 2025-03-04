const calculateHoneyWeight = beehives.map(beehive => {
    const lastWeight = beehive.sensors_data?.weight || 50;
    const honeyIncrease = Math.max(0, lastWeight - 50);
    return honeyIncrease;
});