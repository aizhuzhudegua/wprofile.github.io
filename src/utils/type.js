class ObjectType {
    CUBE = 'CUBE';
    SPHERE = 'SPHERE';
    CYLINDER = 'CYLINDER';
    CONE = 'CONE';
    PYRAMID = 'PYRAMID';

    getAllTypes() {
        return [
            this.CUBE,
            this.SPHERE,
            this.CYLINDER,
            this.CONE,
            this.PYRAMID
        ];
    }
}
const Type3D = new (ObjectType);
export default Type3D;