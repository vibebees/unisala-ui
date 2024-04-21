import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
} from "././../../../components/defaults";
import { useHistory } from "react-router";
import { URLgetter, URLupdate } from "../../../utils/lib/URLupdate";
// import { ButtonTrack } from "features/analytics/ButtonTrack"

const SearchTab = () => {
  const [tab, setTab] = useState("all");
  const history = useHistory();
  const searchParams = new URLSearchParams(history.location.search);
  const query = searchParams.get("q") || "";

  const tabs = useMemo(() => {
    return [
      {
        name: "All",
        value: "all",
      },
      {
        name: "Universities & Scholarships",
        value: "uni",
      },
      {
        name: "Users",
        value: "user",
      },
      {
        name: "Posts",
        value: "post",
      },
      {
        name: "Spaces",
        value: "space",
      },
      {
        name: "Orgs",
        value: "org",
      },
    ];
  }, []);

  useEffect(() => {
    const getTab = URLgetter("tab");
    if (getTab) {
      setTab(getTab);
    } else {
      setTab("all");
    }
  }, [history.location.search]);

  return (
    <Card className="shadow-none ion-no-margin ion-no-padding border-b-2 w-full border-neutral-300 rounded-none">
      <CardContent>
        {query.length > 0 && (
          <Typography variant="p">
            {" "}
            <span className="text-neutral-800 font-medium">
              {" "}
              Search Result For:
            </span>{" "}
            {`"${query}"`}
          </Typography>
        )}
        <div
          style={{
            display: "inline-flex",
            gap: "1rem",
            marginTop: "1.5rem",
            overflow: "auto",
          }}
        >
          {tabs.map((t, index) => (
            <Typography key={index} className="w-fit ">
              <h4
                onClick={() => {
                  const urldata = URLupdate("tab", t.value);
                  history.push({ search: urldata });
                  // ButtonTrack(`${t.value} search tab clicked`)
                }}
                className="max-md:text-xs"
                style={{
                  cursor: "pointer",

                  color: t.value === tab ? "#3171e0" : "",
                  borderBottom: t.value === tab ? "2px solid #3171e0" : "",
                }}
              >
                {t.name}
              </h4>
            </Typography>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchTab;
