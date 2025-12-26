"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCohorts,
  getTracks,
  getTracksDetail,
  selectTrack,
} from "../../app-redux/features/AppData/appSlice";
import { TrackSkeleton } from "../../../components/skeletons/TrackSkeleton";
import TrackCard from "../../../components/TrackCard";
import AppModal from "../../../components/AppModal";
import ViewTrackToSelect from "../../../components/ViewTrackToSelect";

export default function TracksPage() {
  let appData = useSelector((state) => state.appData);
  let { tracksState, cohortsState } = appData;
  let { data: tracks } = tracksState;
  let { data: cohorts } = cohortsState;
  let [trackSelected, set_trackSelected] = useState(null);
  let [modalOpen, set_modalOpen] = useState(null);
  let [selectedCohort, set_selectedCohort] = useState(null);
  let [loadingSelectTrack, set_loadingSelectTrack] = useState(null);
  let [errorSelectTrack, set_errorSelectTrack] = useState(null);
  let [successSelectTrack, set_successSelectTrack] = useState(null);

  let dispatch = useDispatch();

  let getTracksDetailFn = (data) => {
    set_loadingSelectTrack(true);

    set_modalOpen(true);
    set_trackSelected(null);
    set_errorSelectTrack(null);
    set_successSelectTrack(null);

     setTimeout(() => {
        dispatch(getTracksDetail(data?.id))
      .unwrap()
      .then((res) => {
        set_loadingSelectTrack(false);

        set_trackSelected(res);
      })
      .catch((err) => {
        set_loadingSelectTrack(false);

      });
    }, 1000);

  
  };

  let selectCohort = (data) => {
    set_selectedCohort(data);
  };

  let selectTrackUser = () => {
    set_loadingSelectTrack(true);
    set_errorSelectTrack(null);
    set_successSelectTrack(null);
    let dataPassed = {
      track: trackSelected?.id,
      cohort: selectedCohort,
    };
    // alert(JSON.stringify(dataPassed))

    // return 0
    dispatch(
      selectTrack({
        dataPassed,
      })
    )
      .unwrap()
      .then((res) => {
        console.log(res)
        set_loadingSelectTrack(false);

        set_successSelectTrack(
         res?.detail || `You have successfully enrolled to this ${trackSelected?.name} track.`
        );
      })
      .catch((err) => {
        set_loadingSelectTrack(false);
        console.log(err);
        set_errorSelectTrack(err?.response?.data?.detail);
        console.log({ err });
      });
  };

  useEffect(() => {
    dispatch(getTracks());
    dispatch(getCohorts());
  }, []);
  return (
    <>
      <AppModal
        setIsClose={() => {
          set_modalOpen(false);
        }}
        body={
          <>
            <ViewTrackToSelect
              loadingSelectTrack={loadingSelectTrack}
              error={errorSelectTrack}
              success={successSelectTrack}
              onSelect={selectTrackUser}
              selectedCohort={selectedCohort}
              selectCohort={selectCohort}
              cohorts={cohorts}
              track={trackSelected}
            />
          </>
        }
        isOpen={modalOpen}
      />
      <div className="min-h-screen mt-3">
        <h1 className="text-3xl font-bold mb-6 text-slate-700">
          Available Tracks
        </h1>
        {/* {
        JSON.stringify(trackSelected)
      } */}

        <div className="p-4 mb-6 bg-green-50 border-l-4 border-green-500 rounded-md text-green-700">
          <h3 className="font-semibold text-lg">How to choose a track</h3>
          <p className="mt-1 text-sm">
            Select a track that best matches your interests and career goals.
            Each track provides skills and knowledge in a specific area, choose
            the one that excites you the most to get started!
          </p>
        </div>

        {tracksState?.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i) => (
              <TrackSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <TrackCard
                onSelect={getTracksDetailFn}
                key={track?.id}
                track={track}
              ></TrackCard>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
