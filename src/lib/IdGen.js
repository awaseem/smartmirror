/**
 * Created by awaseem on 15-10-31.
 */

export default function generateUID() {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
}
