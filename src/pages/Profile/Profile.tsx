import profileStyle from "./Profile.module.css";
import Navbar from "../../components/Nav/NavBar";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Text } from "../../components/Text/Text";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/Store";

const Profile = () => {
  const user = useSelector((state: RootState) => state.login.user);

  return (
    <div className={profileStyle.container}>
      <Navbar />

      <main className={profileStyle.main}>
        <section className={profileStyle.profileHeader}>
          <div className={profileStyle.cover}></div>

          <div className={profileStyle.avatar}>
            {user
              ? `${user.name.charAt(0)}${user.surname.charAt(0)}`
              : "SB"}
          </div>

          <div className={profileStyle.profileInfo}>
            <Text variant="h1">
              {user
                ? `${user.name} ${user.surname}`
                : "Samukelo Bayanda"}
            </Text>

            <Text variant="p">
              {user?.email || "Sbkathi005@gmail.com"}
            </Text>

            <Text variant="p">
              {user?.number || "069 159 4100"}
            </Text>
          </div>
        </section>

        <section className={profileStyle.profileForms}>
          {/* Personal details */}
          <div className={profileStyle.formCard}>
            <div className={profileStyle.nameFields}>
              <div>
                <label>Name</label>

                <Input
                  type="text"
                  value={user?.name || ""}
                  onChange={() => { }}
                />
              </div>

              <div>
                <label>Surname</label>

                <Input
                  type="text"
                  value={user?.surname || ""}
                  onChange={() => { }}
                />
              </div>
            </div>

            <div className={profileStyle.inputGroup}>
              <label>Email address</label>

              <Input
                type="email"
                value={user?.email || ""}
                onChange={() => { }}
              />
            </div>

            <div className={profileStyle.inputGroup}>
              <label>Number</label>

              <Input
                type="text"
                value={user?.number || ""}
                onChange={() => { }}
              />
            </div>

            <Button className={profileStyle.button}>
              Saved details
            </Button>
          </div>

          {/* Credentials */}
          <div className={profileStyle.formCard}>
            <div className={profileStyle.inputGroup}>
              <label>Email address</label>

              <Input
                type="email"
                value={user?.email || ""}
                onChange={() => { }}
              />
            </div>

            <div className={profileStyle.inputGroup}>
              <label>Password</label>

              <Input
                type="password"
                value=""
                onChange={() => { }}
              />
            </div>

            <div className={profileStyle.inputGroup}>
              <label>Confirm Password</label>

              <Input
                type="password"
                value=""
                onChange={() => { }}
              />
            </div>

            <Button className={profileStyle.button}>
              Update Credentials
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;